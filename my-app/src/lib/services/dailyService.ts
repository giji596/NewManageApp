import { MemoSummary } from "@/type/Memo";
import prisma from "../prisma";
import { DateSummary } from "@/type/Date";

/**
 * DailySummaryPageの表示データをとってくる関数
 */
export const getDailySummaryData = async (year: number, month: number) => {
  const start = new Date(year, month - 1, 1); // 例 2025-04-01
  const end = new Date(year, month, 1); // 例 2025-05-1
  // 範囲内のデータをDBから取得
  const data = await prisma.dailyData.findMany({
    where: {
      date: {
        gte: start,
        lt: end,
      },
    },
    select: {
      date: true,
      logs: {
        select: {
          workTime: true,
          task: {
            select: { name: true, category: { select: { name: true } } },
          },
          memos: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  // FE用にデータを整形
  const dailyData = data.map<DateSummary>((daily) => {
    const logs = daily.logs;

    // 最も時間をかけたタスクを見つける
    const mainTask = logs.reduce((prev, current) => {
      return prev.workTime > current.workTime ? prev : current;
    });

    // メインカテゴリ（最も時間をかけたタスクのカテゴリ）
    const categoryName = mainTask.task.category.name;
    const taskName = mainTask.task.name;

    // メモ
    const memo: MemoSummary[] = mainTask.memos.map((memo) => ({
      id: memo.id,
      title: memo.title,
    }));

    // 日付ごとのサマリーデータを作成
    return {
      date: daily.date,
      categoryName,
      taskName,
      memo,
      dailyHours: logs.reduce((sum, log) => sum + log.workTime, 0),
    };
  });
  return dailyData;
};
