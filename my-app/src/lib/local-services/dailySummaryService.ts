import { DateSummary } from "@/type/Date";
import { db } from "../dexie";
import { MemoSummary } from "@/type/Memo";

/**
 * DailySummaryPageの表示データをとってくる関数
 */
export const getDailySummaryData = async ({
  query,
}: {
  query?: { year?: string; month?: string };
}): Promise<DateSummary[]> => {
  // 年月をNumber型に変換 (空なら現在の年月を取得)
  const year = query?.year ? Number(query.year) : new Date().getFullYear();
  const month = query?.month ? Number(query.month) : new Date().getMonth() + 1; // 月は0から始まるので+1する
  const start = `${year}-${month.toString().padStart(2, "0")}-01`;
  const end = `${year}-${(month + 1).toString().padStart(2, "0")}-01`;
  // 範囲内のデータをDexieから取得
  const rawData = await db.taskLogs
    .where("date")
    .between(start, end, true, false)
    .toArray();

  // key:date, value:{taskId, workTime}[]に変換
  const data = rawData.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = [];
    }
    acc[curr.date].push({ taskId: curr.taskId, workTime: curr.workTime });
    return acc;
  }, {} as Record<string, { taskId: number; workTime: number }[]>);

  // メモ関連
  const logIds = [...new Set(rawData.map((v) => v.id))];
  const memos = await db.memos.where("taskLogId").anyOf(logIds).toArray();
  // タスクからカテゴリを取得
  const taskIds = [...new Set(rawData.map((v) => v.taskId))];
  const tasks = await db.tasks.where("id").anyOf(taskIds).toArray();
  const categoryIds = [...new Set(tasks.map((v) => v.categoryId))];
  const categories = await db.categories
    .where("id")
    .anyOf(categoryIds)
    .toArray();
  // dataから {date, logs: {categoryId, taskId, workTime}[]} に変換
  const fixedData = Object.entries(data).map(([date, logs]) => ({
    date,
    logs: logs.map((log) => {
      const task = tasks.find((task) => task.id === log.taskId)!; // ログからタスクを取得してるので必ず見つかる
      return {
        categoryId: task.categoryId,
        taskId: log.taskId,
        workTime: log.workTime,
      };
    }),
  }));

  // ログの稼働合計が0時間のデータをフィルターする
  const filterNoWork = fixedData.filter((v) => {
    const dailyWorkTimes = v.logs.reduce((a, b) => a + b.workTime, 0);
    return dailyWorkTimes > 0;
  });
  // FE用にデータを整形
  const dailyData = filterNoWork.map((daily) => {
    const logs = daily.logs;

    // 最も時間をかけたタスクを見つける
    const mainTask = logs.reduce((a, b) => (a.workTime > b.workTime ? a : b), {
      categoryId: 0,
      taskId: 0,
      workTime: 0,
    });
    const taskName = tasks.find((task) => task.id === mainTask.taskId)!.name; // findで必ず見つかるので!つける

    // メインカテゴリ（最も時間をかけたタスクのカテゴリ）
    const categoryName = categories.find(
      (category) => category.id === mainTask.categoryId
    )!.name; // findで必ず見つかるので!つける

    // メモ
    const mainTaskMemos = memos.filter(
      (v) =>
        v.taskLogId === rawData.find((v) => v.taskId === mainTask.taskId)!.id
    )!;
    const memo: MemoSummary[] = mainTaskMemos.map((memo) => ({
      id: memo.id,
      title: memo.title,
    }));

    // 日付ごとのサマリーデータを作成
    return {
      date: new Date(daily.date),
      categoryName,
      taskName,
      memo,
      dailyHours: logs.reduce((sum, log) => sum + log.workTime, 0),
    };
  });
  return dailyData;
};
