import { MemoSummary } from "@/type/Memo";
import prisma from "../prisma";
import { DateSummary, DateSummaryDetail } from "@/type/Date";
import { CategoryWithPercentage } from "@/type/Category";

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

/**
 * DailySummaryPageのDetailデータをとってくる関数
 */
export const getDailySummaryDetailData = async (date: Date) => {
  const data = await prisma.dailyData.findUnique({
    where: { date: date },
    select: {
      date: true,
      logs: {
        select: {
          workTime: true,
          task: {
            select: {
              id: true,
              name: true,
              category: { select: { id: true, name: true } },
            },
          },
          memos: { select: { id: true, title: true } },
        },
      },
    },
  });
  if (data) {
    // 取得したデータをDateSummaryDetail型に変換
    const dateSummaryDetail: DateSummaryDetail = {
      date: data.date, // dataがあるので必ず値が取れる
      categoryList: [],
      memoList: [],
    };

    // logsのworkTimeを集計
    const totalWorkTime = data.logs.reduce(
      (total, log) => total + log.workTime,
      0
    );

    // categoryListを作成
    const categoryMap: Record<number, CategoryWithPercentage> = {};

    data.logs.forEach((log) => {
      const task = log.task;
      const workTime = log.workTime;
      const categoryId = task.category.id;
      const categoryName = task.category.name;
      const taskId = task.id;
      const taskName = task.name;

      // CategoryWithPercentageを作成
      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = {
          id: categoryId,
          name: categoryName,
          taskList: [],
          percent: "0", // 初期値
        };
      }

      // TaskWithPercentageを作成
      categoryMap[categoryId].taskList.push({
        id: taskId,
        name: taskName,
        percent: ((workTime / totalWorkTime) * 100).toFixed(2), // パーセントを計算
      });
    });

    // categoryListにデータをセット
    dateSummaryDetail.categoryList = Object.values(categoryMap);

    // memoListを作成
    dateSummaryDetail.memoList = data.logs.flatMap((log) =>
      log.memos.map((memo) => ({
        id: memo.id,
        title: memo.title,
      }))
    );

    console.log(dateSummaryDetail);
    return dateSummaryDetail;
  }
  return null;
};
