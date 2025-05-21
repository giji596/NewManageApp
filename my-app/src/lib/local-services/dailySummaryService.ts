import { DateSummary, DateSummaryDetail } from "@/type/Date";
import { db } from "../dexie";
import { MemoSummary } from "@/type/Memo";
import { TaskWithPercentage } from "@/type/Task";
import { CategoryWithPercentage } from "@/type/Category";
import { DailyWorkTime } from "@/type/Main";

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

/**
 * DailySummaryPageのDetailデータをとってくる関数
 */
export const getDailySummaryDetailData = async (date: string) => {
  // データをDexieから取得
  const rawData = await db.taskLogs.where("date").equals(date).toArray();
  // なければnullを返す
  if (rawData.length === 0) {
    return null;
  }

  // データがある場合
  // 必要なデータを取得
  const memos = await db.memos
    .where("taskLogId")
    .anyOf(rawData.map((log) => log.id))
    .toArray();
  const tasks = await db.tasks
    .where("id")
    .anyOf(rawData.map((log) => log.taskId))
    .toArray();
  const categories = await db.categories
    .where("id")
    .anyOf(tasks.map((task) => task.categoryId))
    .toArray();

  // DateSummaryDetail型に変換
  const dateSummaryDetail: DateSummaryDetail = {
    date: new Date(date),
    categoryList: [],
    memoList: [],
  };

  // logsのworkTimeを集計
  const totalWorkTime = rawData.reduce((total, log) => total + log.workTime, 0);

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
  rawData.forEach((log) => {
    const task = tasks.find((task) => task.id === log.taskId)!;
    const category = categories.find(
      (category) => category.id === task.categoryId
    )!;
    const workTime = log.workTime;

    // カテゴリのkeyがない場合は作る
    if (!categoryWorkTime[category.id]) {
      categoryWorkTime[category.id] = {
        categoryName: category.name,
        workTime,
      };
    } else {
      // すでにある場合はworkTimeを加算する
      categoryWorkTime[category.id].workTime += workTime;
    }

    // 同じidのタスクはないのでこちらは分岐不要
    taskWorkTime[task.id] = {
      categoryId: category.id,
      taskName: task.name,
      workTime,
    };
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
        const percent = ((task.workTime / category.workTime) * 100).toFixed(1);
        tasks.push({
          id: taskIdNum,
          name: task.taskName,
          percent: `${percent}%`,
        });
      }
    });

    // カテゴリについて
    const categoryPercent = ((category.workTime / totalWorkTime) * 100).toFixed(
      1
    );

    return {
      id: categoryIdNum,
      name: category.categoryName,
      taskList: tasks,
      percent: `${categoryPercent}%`,
    };
  });

  dateSummaryDetail.categoryList = categoryList;

  // memoListを作成
  dateSummaryDetail.memoList = rawData.flatMap((log) =>
    memos
      .filter((memo) => memo.taskLogId === log.id)
      .map((memo) => ({
        id: memo.id,
        title: memo.title,
      }))
  );

  return dateSummaryDetail;
};

/**
 * 最近(29~35日間)の日毎の稼働時間を取得するメソッド
 */
export const getRecentWorkTime = async () => {
  const todayDate = new Date();
  const dayOfWeek = todayDate.getDay(); // 0 = Sunday, ..., 6 = Saturday
  const dateStartWithMonday = (dayOfWeek + 6) % 7; // 0 = Monday, ..., 6 = Sunday
  // 現在の曜日に合わせてデータ取得範囲を制限(ヒートグラフの大きさに合わせて制限)
  const displayDayCount = 28 + dateStartWithMonday; // 月曜=28日間,...日曜=34日間
  const startDate = new Date(todayDate);
  startDate.setDate(todayDate.getDate() - displayDayCount); // 今日の日付 - 28(月曜日)~34(日曜日)の日付

  // Dexieからデータを取得
  const rawData = await db.taskLogs
    .where("date")
    .between(
      startDate.toISOString().split("T")[0],
      todayDate.toISOString().split("T")[0],
      true,
      true
    )
    .toArray();

  // 日付ごとに稼働時間を集計
  const workTimeByDate: Record<string, number> = {};
  rawData.forEach((log) => {
    if (!workTimeByDate[log.date]) {
      workTimeByDate[log.date] = 0;
    }
    workTimeByDate[log.date] += log.workTime;
  });

  // 結果を整形
  const result: DailyWorkTime[] = Object.entries(workTimeByDate).map(
    ([date, totalHours]) => ({
      date,
      totalHours,
    })
  );

  // 合計時間0のデータは不要(FEではデータなしと同等の扱い)なのでフィルターして送らない
  return result.filter((v) => v.totalHours !== 0);
};
