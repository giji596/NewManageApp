import {
  CategoryCompareGraphQuery,
  CategoryCompareGraphRawData,
  CategoryHeaderQuery,
  CategoryOption,
  CategorySummary,
} from "@/type/Category";
import {
  addDays,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInMonths,
  getWeeksInMonth,
  startOfMonth,
  subMonths,
  subWeeks,
} from "date-fns";
import { db } from "../dexie";
import { CategoryTaskActivity, CategoryTaskList } from "@/type/Task";
import { CategoryActivityQuery } from "@/type/Query";
import { CreateCategoryBody } from "@/type/Request";
import { LINE_GRAPH_COLOR_LIST } from "@/constant/categoryPage";

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
export const createCategory = async ({ name }: CreateCategoryBody) => {
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
  { range, start, end }: CategoryActivityQuery
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
 * カテゴリないのタスク一覧取得するロジック
 */
export const getCategoryTasks = async (id: number) => {
  const tasks = await db.tasks.where("categoryId").equals(id).toArray();
  const data: CategoryTaskList[] = tasks.map((task) => ({
    id: task.id,
    name: task.name,
    progress: task.progress,
    isFavorite: task.isFavorite,
  }));
  return data;
};

/**
 * カテゴリの比較用データを取得するロジック
 */
export const getCategoryCompareGraphData = async (
  params?: CategoryCompareGraphQuery
) => {
  // パラメータ分解 デフォ値はコンポーネント側と同様
  // 表示対象(デフォ：稼働時間)
  const displayTarget = params?.displayTarget ?? "totalHours";
  // 開始期間(デフォ：5週間前)
  const startDate =
    params?.startDate ?? subWeeks(new Date(), 5).toISOString().split("T")[0];
  // 終了期間(デフォ：今日)
  const endDate = params?.endDate ?? new Date().toISOString().split("T")[0];

  // 日付内のログを取得
  const logs = await db.taskLogs
    .where("date")
    .between(startDate, endDate)
    .toArray();
  // ログに関連したタスクを取得
  const taskIds = logs.map((log) => log.taskId);
  const tasks = await db.tasks.where("id").anyOf(taskIds).toArray();
  // タスクに関連したカテゴリを取得
  const categoryIds = tasks.map((task) => task.categoryId);
  const categories = await db.categories
    .where("id")
    .anyOf(categoryIds)
    .toArray();

  // カテゴリを中心としてログとタスクを関連付け
  const categoryWithLogs = categories.map((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.categoryId === category.id
    );
    const categoryLogs = logs.filter((log) =>
      categoryTasks.some((task) => task.id === log.taskId)
    );
    return {
      // 識別ようにid
      id: category.id,
      // ログは時間と日付だけあればok
      logs: categoryLogs.map((v) => ({ date: v.date, workTime: v.workTime })),
    };
  });

  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);
  // 集計範囲の日数を取得
  const dayCount = differenceInCalendarDays(endDateDate, startDateDate);
  // 集計データの粒度を設定
  const timeUnit = dayCount <= 12 ? "day" : dayCount <= 84 ? "week" : "month";

  // 初めの年月を取得
  const startYear = startDateDate.getFullYear();
  const startMonth = startDateDate.getMonth() + 1; // getMonth()は0からスタートするので+1
  // 月初の日時を取得（例: 2025-04-01）
  const startOfMonthDate = startOfMonth(startDateDate);
  // 月内での週番号を取得（週の開始は月曜でOKな場合）
  const startDateWeekNumber =
    differenceInCalendarWeeks(startDateDate, startOfMonthDate, {
      weekStartsOn: 1,
    }) + 1; // 差を計算してるので+1で何周目か取得
  // 月と週番号を取得する関数
  const getMonthAndWeek = (idx: number) => {
    // 初期値で現在の月と週番号+idxを取得
    let year: number = startYear;
    let month: number = startMonth;
    let week: number = startDateWeekNumber + idx;
    // 月と週を取得
    while (true) {
      // 月内での週数を取得
      const weeksInMonth = getWeeksInMonth(new Date(year, month, 1));
      // 週が月の週数以下であればbreak
      if (week <= weeksInMonth) break;
      // 最終月であれば年を増やして月を1にする
      if (month === 12) {
        year += 1;
        month = 1;
      } else {
        // それ以外なら月を増やす
        month += 1;
      }
      // 週をその月の週分減らす
      week -= weeksInMonth;
    }
    return { month, week };
  };

  const monthCount = differenceInMonths(startDateDate, endDateDate) + 1;
  const getYearAndMonth = (idx: number) => {
    let year = startYear;
    let month = startMonth + idx;
    // 月が12月以内になるまで繰り返す
    while (month <= 12) {
      year += 1;
      month -= 12;
    }
    return { year, month };
  };

  // 日付リスト
  const dayList =
    // 日付ごとであればstart~endまでの日付を配列で取得
    timeUnit === "day"
      ? Array.from(
          { length: dayCount },
          (_, i) => addDays(startDateDate, i).toISOString().split("T")[0]
        )
      : // 週ごとであればstart~endまでの日付を週ごとに集計して配列で取得
      timeUnit === "week"
      ? Array.from({ length: Math.ceil(dayCount / 7) }, (_, i) => {
          const { month, week } = getMonthAndWeek(i);
          return `${month}月第${week}週`;
        })
      : // 月ごとであればstart~endまでの日付を月ごとに集計して配列で取得
        Array.from({ length: monthCount }, (_, i) => {
          const { year, month } = getYearAndMonth(i);
          return `${year}年${month}月`;
        });

  const result: CategoryCompareGraphRawData[] = categories.map(
    (category, idx) => {
      // id,name,colorはそのまま取得
      const id = category.id;
      const name = category.name;
      const color = LINE_GRAPH_COLOR_LIST[idx % 20]; // カラーリストは20色周期でリストから取得

      // valuesについて dayList分取得
      const values = dayList.map((day) => {
        const date = day;
        // timeUnitに応じてデータをフィルター
        const target = categoryWithLogs.find((v) => v.id === id)!;
        const dayDate = target.logs.filter((v) => {
          switch (timeUnit) {
            case "day":
              return v.date === date;
            case "week": {
              // 対象の月/週番号を取得
              const formatDate = new Date(v.date);
              const month = formatDate.getMonth() + 1;
              const weekNumber =
                differenceInCalendarWeeks(
                  formatDate,
                  startOfMonth(formatDate)
                ) + 1;
              // day側の月/週番号を取得
              const splitDay = day.split("月第");
              const targetMonth = Number(splitDay[0]);
              const targetWeek = Number(splitDay[1].replace("週", ""));
              return weekNumber === targetWeek && month === targetMonth;
            }
            case "month": {
              // 対象の年/月を取得
              const formatDate = new Date(v.date);
              const year = formatDate.getFullYear();
              const month = formatDate.getMonth() + 1;
              // day側の年/月を取得
              const splitDay = day.split("年");
              const targetYear = Number(splitDay[0]);
              const targetMonth = Number(splitDay[1].replace("月", ""));
              return year === targetYear && month === targetMonth;
            }
          }
        });
        let value: number = 0;
        // displayTargetによって分岐
        if (displayTarget === "totalHours") {
          // 稼働時間はdayDataのworkTimeを合計
          value = dayDate.reduce((a, b) => a + b.workTime, 0);
        } else if (displayTarget === "taskCount") {
          // タスク数はdayDataの数で取得
          value = dayDate.length;
        }
        return { date, value };
      });
      const sortedValues = values.sort((a, b) => a.value - b.value);
      return { id, name, color, values: sortedValues };
    }
  );
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
