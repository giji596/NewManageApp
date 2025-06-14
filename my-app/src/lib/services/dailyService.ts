import { MemoSummary } from "@/type/Memo";
import prisma from "../prisma";
import { DateSummary, DateSummaryDetail } from "@/type/Date";
import { CategoryWithPercentage } from "@/type/Category";
import { TaskWithPercentage } from "@/type/Task";
import { format, getDay, subDays } from "date-fns";
import { DailyWorkTime } from "@/type/Main";

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
  // ログの稼働合計が0時間のデータをフィルターする
  const filterNoWork = data.filter((v) => {
    const dailyWorkTimes = v.logs.reduce((a, b) => a + b.workTime, 0);
    if (dailyWorkTimes > 0) return true;
    return false;
  });
  // FE用にデータを整形
  const dailyData = filterNoWork.map<DateSummary>((daily) => {
    const logs = daily.logs;

    // 最も時間をかけたタスクを見つける
    const mainTask = logs.reduce(
      (prev, current) => {
        return prev.workTime > current.workTime ? prev : current;
      },
      { workTime: -1, task: { name: "", category: { name: "" } }, memos: [] }
    );

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
        where: { workTime: { not: 0 } }, // 稼働時間が0の場合は除外
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
  if (data && data.logs.length !== 0) {
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

    // categoryIDごとのworkTimeを集計
    const categoryWorkTime: Record<
      number,
      { categoryName: string; workTime: number }
    > = {};
    // タスクIDごとのworkTimeを記録
    const taskWorkTime: Record<
      number,
      { categoryId: number; taskName: string; workTime: number }
    > = {};

    // カテゴリ/タスクごとの時間を集計する
    data.logs.forEach((log) => {
      const task = log.task;
      const workTime = log.workTime;
      const categoryId = task.category.id;
      const categoryName = task.category.name;
      const taskId = task.id;
      const taskName = task.name;

      // カテゴリのkeyがない場合は作る
      if (!categoryWorkTime[categoryId]) {
        categoryWorkTime[categoryId] = { categoryName, workTime };
      } else {
        // すでにある場合はworkTimeを加算する
        categoryWorkTime[categoryId].workTime += workTime;
      }
      // 同じidのタスクはないのでこちらは分岐不要
      taskWorkTime[taskId] = { categoryId, taskName, workTime };
    });

    // パーセント化してオブジェクト化
    const categoryList: CategoryWithPercentage[] = Object.keys(
      categoryWorkTime
    ).map((categoryId) => {
      // keyをnumber化
      const categoryIdNum = parseInt(categoryId);
      const category = categoryWorkTime[categoryIdNum];

      // タスクについて
      const tasks: TaskWithPercentage[] = [];
      // categoryIdが一致するタスクのみをtasks配列にpushする
      Object.keys(taskWorkTime).map((taskId) => {
        // keyをnumber化
        const taskIdNum = parseInt(taskId);
        const task = taskWorkTime[taskIdNum];
        if (task.categoryId === categoryIdNum) {
          const percent = ((task.workTime / category.workTime) * 100).toFixed(
            1
          );
          tasks.push({
            id: taskIdNum,
            name: task.taskName,
            percent: `${percent}%`,
          });
        }
      });

      // カテゴリについて
      const categoryPercent = (
        (category.workTime / totalWorkTime) *
        100
      ).toFixed(1);

      return {
        id: categoryIdNum,
        name: category.categoryName,
        taskList: tasks,
        percent: `${categoryPercent}%`,
      };
    });

    dateSummaryDetail.categoryList = categoryList;

    // memoListを作成
    dateSummaryDetail.memoList = data.logs.flatMap((log) =>
      log.memos.map((memo) => ({
        id: memo.id,
        title: memo.title,
      }))
    );
    return dateSummaryDetail;
  }
  return null;
};

/**
 * 最近(29~35日間)の日毎の稼働時間を取得するメソッド
 */
export const getRecentWorkTime = async () => {
  const todayDate = getDay(new Date()); // 0 = Sunday, ..., 6 = Saturday
  const dateStartWithMonday = (todayDate + 6) % 7; // 0 = Monday, ... 6 = Sunday
  // 現在の曜日に合わせてデータ取得範囲を制限(ヒートグラフの大きさに合わせて制限)
  const displayDayCount = 28 + dateStartWithMonday; // 月曜=28日間,...日曜=34日間
  const startDate = subDays(new Date(), displayDayCount); // 今日の日付　- 28(月曜日)~34(日曜日)の日付
  const data = await prisma.dailyData.findMany({
    where: { date: { gte: startDate } },
    select: { date: true, logs: { select: { workTime: true } } },
  });

  const result: DailyWorkTime[] = data.map((v) => {
    const date = format(v.date, "yyyy-MM-dd");
    const totalHours = v.logs.reduce((a, b) => a + b.workTime, 0);
    return {
      date,
      totalHours,
    };
  });
  // 合計時間0のデータは不要(FEではデータなしと同等の扱い)なのでフィルターして送らない
  return result.filter((v) => v.totalHours !== 0);
};
