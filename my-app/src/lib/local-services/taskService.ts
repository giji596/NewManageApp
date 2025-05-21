import { subMonths } from "date-fns";
import { db } from "../dexie";
import { MainPagePieChart } from "@/type/Main";
import { TaskOption } from "@/type/Task";

/**
 * タスク選択賜一覧げっとする関数
 */
export const getTaskOptions = async (categoryId: number) => {
  // カテゴリidが一致するデータを取得
  const data = await db.tasks.where("categoryId").equals(categoryId).toArray();
  const result: TaskOption[] = data
    .filter((v) => v.progress !== 100) // 完了済みを除外する
    .map((v) => {
      return { id: v.id, name: v.name }; // 必要なパラメータだけ取得
    });
  // データが空の場合はid:0で表示
  if (result.length === 0) result.push({ id: 0, name: "タスクがありません" });
  return result;
};

/**
 * タスク作成する関数
 */
export const createTask = async (
  name: string,
  categoryId: number,
  isFavorite: boolean
) => {
  // 重複チェック
  const categoryTaskList = await db.tasks.where({ categoryId }).toArray();
  const existing = categoryTaskList.find((v) => v.name === name);
  if (existing !== undefined) throw new Error("duplicate error");

  // くりえーとする
  const id = await db.tasks.add({
    name,
    categoryId,
    isFavorite,
    progress: 0,
  });

  return { id, name };
};

/**
 * メインページ用の一ヶ月分のカテゴリ別の稼働をとってくるロジック
 */
export const getLastMonthTaskActivities = async () => {
  // 現在と一ヶ月前のDateを取得
  const now = new Date();
  const oneMonthAgo = subMonths(now, 1);
  // DBの比較用にstring("yyyy-mm-dd")形式に変更
  const fromDate = oneMonthAgo.toISOString();
  const toDate = now.toISOString();

  // 日付内の稼働を全て取得
  const logActiveLastMonth = await db.taskLogs
    .where("date")
    .between(fromDate, toDate)
    .toArray();
  // 0時間の稼働は含めない
  const filteredLog = logActiveLastMonth.filter((v) => v.workTime !== 0);

  // 全体の合計時間
  const totalHours = filteredLog.reduce((a, b) => a + b.workTime, 0);
  // タスクごとの時間(id + hours)
  const totalTaskHours = filteredLog.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.id === item.taskId);
    if (existing) {
      existing.hours += item.workTime;
    } else {
      acc.push({ id: item.taskId, hours: item.workTime });
    }
    return acc;
  }, [] as { id: number; hours: number }[]);

  // タスクのid一覧
  const taskIdList = [...new Set(filteredLog.map((v) => v.taskId))];
  // タスク一覧
  const taskList = await db.tasks.where("id").anyOf(taskIdList).toArray();

  // カテゴリごとの時間(id + hours)
  const totalCategoryHours = taskList.reduce((acc, item) => {
    // 存在とタスクの稼働時間を取得
    const existing = acc.find((entry) => entry.id === item.categoryId);
    const workTime = totalTaskHours.find((v) => v.id === item.id)!.hours; // 元データなのでundefinedにならない
    if (existing) {
      existing.hours += workTime;
    } else {
      acc.push({ id: item.categoryId, hours: workTime });
    }
    return acc;
  }, [] as { id: number; hours: number }[]);

  // カテゴリ一ID覧を取得
  const categoryIdList = [...new Set(taskList.map((v) => v.categoryId))];
  // カテゴリ一覧
  const categoryList = await db.categories
    .where("id")
    .anyOf(categoryIdList)
    .toArray();
  const result: MainPagePieChart[] = categoryList.map((v) => {
    const id = v.id;
    const name = v.name;
    const categoryHours = totalCategoryHours.find(
      (item) => item.id === v.id
    )!.hours;
    const value = (categoryHours * 1000) / totalHours;
    const task = taskList
      .filter((item) => item.categoryId === v.id)
      .map((item) => {
        const taskName = item.name;
        const hours = totalTaskHours.find(
          (hours) => hours.id === item.id
        )!.hours;
        return { name: taskName, hours: `${hours}(h)` };
      });
    return {
      id,
      name,
      value,
      task,
    };
  });

  return result;
};

/**
 * 指定された日時に基づいて、タスクの firstActivityDate および lastActivityDate を必要に応じて更新します。
 * - firstActivityDate が未設定、または指定日時より後であれば、指定日時に更新します。
 * - lastActivityDate が未設定、または指定日時より前であれば、指定日時に更新します。
 */
export const updateTaskActivityDatesIfNeeded = async (
  date: string,
  taskId: number
) => {
  // タスクの更新日を取得
  const target = await db.tasks.get(taskId);

  if (!target) {
    throw new Error("Task not found");
  }

  // 更新データ用のオブジェクトを作成
  const updateData: Partial<{
    firstActivityDate: string;
    lastActivityDate: string;
  }> = {};

  // 開始日について、対象のタスクが存在しかつ開始日がないか未来の日付の場合に更新処理のキューに含める
  if (
    target.firstActivityDate === undefined ||
    target.firstActivityDate === null ||
    target.firstActivityDate > date
  ) {
    updateData.firstActivityDate = date;
  }

  // 最終実施日について、対象のタスクが存在しかつ更新日がないか過去の日付の場合に更新処理のキューに含める
  if (
    target.lastActivityDate === undefined ||
    target.lastActivityDate === null ||
    target.lastActivityDate < date
  ) {
    updateData.lastActivityDate = date;
  }

  // updateDataに更新内容が含まれている場合は更新処理を実行
  if (Object.keys(updateData).length > 0) {
    await db.tasks.update(taskId, updateData);
  }
};

/**
 * タスクの進捗を取得する関数
 */
export const getTaskProgress = async (id: number) => {
  const data = await db.tasks.get(id);
  return data ? { progress: data.progress } : null;
};
