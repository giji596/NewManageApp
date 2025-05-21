import {
  CategoryHeaderQuery,
  CategoryOption,
  CategorySummary,
} from "@/type/Category";
import { subMonths } from "date-fns";
import { db } from "../dexie";
import { CategoryTaskActivity } from "@/type/Task";

/**
 * カテゴリ選択賜一覧取得
 */
export const getCategoryOptions = async (
  query?: CategoryHeaderQuery
): Promise<CategoryOption[]> => {
  const hideCompleted = query?.hideCompleted;
  const startDate =
    query?.displayRange === "last-3-months"
      ? subMonths(new Date(), 3)
      : query?.startDate
      ? new Date(query.startDate)
      : undefined;
  const startDateString = startDate?.toISOString().split("T")[0];
  const endDate =
    query?.displayRange === "last-3-months"
      ? new Date()
      : query?.endDate
      ? new Date(query.endDate)
      : undefined;
  const endDateString = endDate?.toISOString().split("T")[0];
  const data = await db.categories.toArray();
  const taskData = await db.tasks.toArray();

  const filteredData = data.filter((category) => {
    if (hideCompleted && category.isCompleted) {
      return false;
    }
    return true;
  });

  const latestData = filteredData.map((v) => {
    const latest = taskData
      .filter((item) => item.categoryId === v.id)
      .reduce(
        (a, b) =>
          b.lastActivityDate
            ? a < b.lastActivityDate
              ? b.lastActivityDate
              : a
            : a,
        "1990-01-01"
      );
    return { id: v.id, name: v.name, latestDate: latest };
  });

  if (!startDateString || !endDateString) {
    const sorted = latestData.sort((a, b) =>
      b.latestDate > a.latestDate ? 1 : -1
    );
    // データがない場合
    if (sorted.length === 0) {
      return [{ id: 0, name: "カテゴリがありません" }];
    }
    return sorted.map((v) => {
      return { id: v.id, name: v.name };
    });
  }

  const filtered = latestData.filter(
    (v) => startDateString <= v.latestDate && v.latestDate <= endDateString
  );
  const sorted = filtered.sort((a, b) =>
    b.latestDate > a.latestDate ? 1 : -1
  );
  // データがない場合
  if (sorted.length === 0) {
    return [{ id: 0, name: "カテゴリがありません" }];
  }

  return sorted.map((v) => {
    return { id: v.id, name: v.name };
  });
};

/**
 * カテゴリーの概要データを取得するロジック
 */
export const getCategorySummary = async (
  id: number
): Promise<CategorySummary | null> => {
  // カテゴリ関連のデータ取得
  const category = await db.categories.get(id);
  if (!category) return null;

  // 開始日と最終更新日を取得する
  const tasks = await db.tasks.where("categoryId").equals(id).toArray();
  const startedAt = tasks.reduce(
    (earliest, task) =>
      task.firstActivityDate && (!earliest || task.firstActivityDate < earliest)
        ? task.firstActivityDate
        : earliest,
    null as string | null
  );
  const lastAt = tasks.reduce(
    (latest, task) =>
      task.lastActivityDate && (!latest || task.lastActivityDate > latest)
        ? task.lastActivityDate
        : latest,
    null as string | null
  );

  // stringに変換後にreturnの型定義の形にフォーマットする
  const startString = startedAt ? startedAt.split("T")[0] : "--------";
  const lastString = lastAt ? lastAt.split("T")[0] : "--------";
  const activeDate = `${startString}~${lastString}`;

  // 総稼働時間を計算
  const taskIds = tasks.map((task) => task.id);
  const taskLogs = await db.taskLogs.where("taskId").anyOf(taskIds).toArray();
  const totalHours = taskLogs.reduce((sum, logs) => sum + logs.workTime, 0);

  // 整形してreturn
  return {
    name: category.name,
    isCompleted: category.isCompleted,
    totalHours,
    activeDate,
  };
};

/**
 * 新規カテゴリの作成 (重複がある場合はnullを返す)
 */
export const createCategory = async (name: string) => {
  // 重複チェック
  const existingCategory = await db.categories
    .where("name")
    .equals(name)
    .first();
  if (existingCategory) {
    throw new Error("duplicate error");
  }
  const id = await db.categories.add({ name, isCompleted: false });
  const isCompleted = false;
  return { id, name, isCompleted };
};

/**
 * カテゴリのアクティビティ取得ロジック
 */
export const getCategoryActivity = async (
  id: number,
  range?: "last-month" | "all" | "select",
  start?: string,
  end?: string
) => {
  let startDate: string | undefined;
  let lastDate: string | undefined;
  switch (range) {
    // 全てであればstartDate/lastDateは変化なし(undefined)
    case "all":
      break;
    // 選択の場合はstart/endから取得(両方与えられてる前提)
    case "select":
      if (start && end) {
        startDate = start;
        lastDate = end;
      }
      break;
    // 先月(またはrangeがなし)の場合は先月までの範囲を指定
    case "last-month":
    default:
      startDate = subMonths(new Date(), 1).toISOString().split("T")[0];
      lastDate = new Date().toISOString().split("T")[0];
  }

  const tasks = await db.tasks.where("categoryId").equals(id).toArray();
  const taskIds = tasks.map((task) => task.id);
  const taskLogs = await db.taskLogs.where("taskId").anyOf(taskIds).toArray();

  // 条件に一致するログだけをフィルタリング
  const filteredLogs = taskLogs.filter((log) => {
    // startDateとlastDateが両方指定されている場合
    if (startDate && lastDate) {
      const logDate = log.date;
      // 期間内の稼働 かつ時間が0でないもののみ表示
      return logDate >= startDate && logDate <= lastDate && log.workTime !== 0;
    }
    // 日付が指定されてない場合は稼働のないデータだけフィルターする
    return log.workTime !== 0;
  });

  const result: CategoryTaskActivity[] = tasks
    // ログにないタスクは除外
    .filter((v) => filteredLogs.some((log) => log.taskId === v.id))
    .map((task) => {
      const taskName = task.name;
      const totalHours = filteredLogs
        .filter((v) => v.taskId === task.id)
        .reduce((a, b) => a + b.workTime, 0);
      return {
        taskName,
        totalHours,
      };
    });
  return result;
};

/**
 * カテゴリを完了状態にするロジック
 */
export const updateCategoryCompleted = async (id: number) => {
  // カテゴリを完了状態に更新
  await db.categories.update(id, { isCompleted: true });

  // 関連するタスクの進捗を全て100(完了)に変更する
  const tasks = await db.tasks.where("categoryId").equals(id).toArray();
  await Promise.all(
    tasks.map((task) => db.tasks.update(task.id, { progress: 100 }))
  );
  return { id };
};

/**
 * カテゴリ削除するロジック
 */
export const deleteCategory = async (id: number) => {
  // 使用中かどうか確認
  const exist = await db.tasks.where("categoryId").equals(id).first();
  if (exist) {
    throw new Error("relationship error");
  }
  // 使用中でなければカテゴリを削除
  await db.categories.delete(id);

  return { id };
};
