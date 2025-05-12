import {
  MainPageTaskTable,
  TaskDetail,
  TaskOption,
  TaskSummary,
  TaskSummaryRangeQuery,
} from "@/type/Task";
import prisma from "../prisma";
import { subMonths } from "date-fns";
import { MainPagePieChart } from "@/type/Main";

/**
 * タスク選択賜一覧げっとする関数
 */
export const getTaskOptions = async (categoryId: number) => {
  const data: TaskOption[] = await prisma.task.findMany({
    where: {
      categoryId: categoryId,
      progress: { not: 100 /** 完了済みは取得しない */ },
    },
    select: { id: true, name: true },
  });
  return data;
};

/**
 * タスク一覧ページのデータを取得する関数
 */
export const getTaskSummary = async (
  query?: TaskSummaryRangeQuery
): Promise<TaskSummary[]> => {
  const { progress, startDate, lastDate, activeOnly } = query ?? {}; // undefinedの場合{}となり、参照keyがないので左辺の全てのkeyはundefinedになる
  const data = await prisma.task.findMany({
    // クエリがある場合のみ検証(...(false)の場合は検証しない)
    where: {
      progress: {
        gte: progress?.split(",").map((v) => Number(v))[0] ?? 0, // クエリ分割した前の方の進捗
        lte: progress?.split(",").map((v) => Number(v))[1] ?? 90, // クエリ分割した後の方の進捗
      },
      ...(startDate !== undefined && {
        createdAt: {
          gte: startDate.split(",").map((v) => new Date(v))[0], // クエリ分割した前の方の日付
          lte: startDate.split(",").map((v) => new Date(v))[1], // クエリ分割した後の方の日付
        },
      }),
      ...(lastDate !== undefined && {
        updatedAt: {
          gte: lastDate.split(",").map((v) => new Date(v))[0], // クエリ分割した前の方の日付
          lte: lastDate.split(",").map((v) => new Date(v))[1], // クエリ分割した後の方の日付
        },
      }),
      ...(activeOnly !== undefined && {
        tasks: { some: {} }, // 1つ以上のログがある場合
      }),
    },
    select: {
      id: true,
      name: true,
      category: { select: { name: true } },
      progress: true,
      isFavorite: true,
      tasks: { select: { workTime: true } },
      createdAt: true,
      updatedAt: true,
    },
  });
  const result: TaskSummary[] = data.map((task) => {
    const totalHours = task.tasks.reduce((a, b) => a + b.workTime, 0);
    return {
      id: task.id,
      taskName: task.name,
      isFavorite: task.isFavorite,
      categoryName: task.category.name,
      progress: task.progress,
      totalHours: totalHours,
      startDate: task.createdAt,
      lastDate: task.updatedAt,
    };
  });
  return result;
};

/**
 * タスク作成する関数
 */
export const createTask = async (
  name: string,
  categoryId: number,
  isFavorite: boolean,
  createdAt: Date
) => {
  // 重複チェック
  const existing = await prisma.task.findFirst({
    where: {
      categoryId,
      name,
    },
    select: { id: true },
  });
  if (existing !== null) return null;
  // くりえーとする
  const data: TaskOption = await prisma.task.create({
    data: { name, categoryId, isFavorite, progress: 0, createdAt },
    select: {
      id: true,
      name: true,
    },
  });
  return data;
};

/**
 * タスクを一括更新するメソッド(一覧ページで利用)
 */
export const bulkUpdateTask = async (
  updateData: { id: number; progress?: number; isFavorite?: boolean }[]
) => {
  const data = await prisma.$transaction(
    updateData.map((v) =>
      prisma.task.update({
        where: { id: v.id },
        data: {
          ...(v.progress !== undefined && { progress: v.progress }),
          ...(v.isFavorite !== undefined && { isFavorite: v.isFavorite }),
        },
        select: { id: true },
      })
    )
  );
  return data;
};

/**
 * タスク詳細データ取得ロジック
 */
export const getTaskDetail = async (id: number) => {
  const data = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      category: true,
      progress: true,
      isFavorite: true,
      tasks: {
        select: {
          workTime: true,
          date: true,
          memos: {
            select: {
              id: true,
              title: true,
              tag: { select: { name: true } },
              text: true,
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  if (data) {
    // 総稼働時間は計算
    const totalHours = data.tasks.reduce((a, b) => a + b.workTime, 0);
    // メモは整形してflatに
    const memos = data.tasks.flatMap((task) =>
      task.memos.map((memo) => {
        // タグなければ未選択とする
        const tag = memo.tag?.name ?? "未選択";
        // summaryは30文字超える場合は 30文字+... に変更
        const summary =
          memo.text.length > 30 ? `${memo.text.slice(0, 30)}...` : memo.text;
        return {
          id: memo.id,
          date: task.date,
          title: memo.title,
          tag: tag,
          summary: summary,
        };
      })
    );
    const result: TaskDetail = {
      id: data.id,
      name: data.name,
      isFavorite: data.isFavorite,
      category: data.category,
      progress: data.progress,
      totalHours: totalHours,
      startDate: data.createdAt.toISOString(),
      lastDate: data.updatedAt.toISOString(),
      memo: memos,
    };
    return result;
  }
  // データないときはnull
  return null;
};

export const updateTaskDetail = async (
  id: number,
  taskName?: string,
  categoryId?: number,
  isFavorite?: boolean,
  progress?: number
) => {
  const data = await prisma.task.update({
    where: { id },
    data: {
      // あるデータだけ更新
      ...(taskName !== undefined && { name: taskName }),
      ...(categoryId !== undefined && { categoryId }),
      ...(isFavorite !== undefined && { isFavorite }),
      ...(progress !== undefined && { progress }),
    },
    select: { id: true },
  });
  return data;
};

export const deleteTask = async (id: number) => {
  const data = await prisma.task.delete({
    where: { id },
    select: { id: true },
  });
  return data;
};

/**
 * メインページ用の一ヶ月分のカテゴリ別の稼働をとってくるロジック
 */
export const getLastMonthTaskActivities = async () => {
  const data = await prisma.category.findMany({
    select: {
      name: true,
      tasks: {
        select: {
          name: true,
          tasks: {
            where: {
              date: {
                gte: subMonths(new Date(), 1),
                lte: new Date(),
              },
            },
            select: { workTime: true },
          },
        },
      },
    },
  });

  // 全体の合計時間を取得
  const totalHours = data.reduce(
    (a, b) =>
      a +
      b.tasks.reduce(
        (c, d) => c + d.tasks.reduce((e, f) => e + f.workTime, 0),
        0
      ),
    0
  );

  const result: MainPagePieChart[] = data.map((v) => {
    // カテゴリの時間を取得して全体の割合からvalueを求める
    const categoryHours = v.tasks.reduce(
      (a, b) => a + b.tasks.reduce((c, d) => c + d.workTime, 0),
      0
    );
    const value = (categoryHours * 1000) / totalHours;
    // タスクを整形
    const task = v.tasks.map((item) => {
      const name = item.name;
      // 時間はstring ("00(h)"の形式)
      const taskHours = item.tasks.reduce((a, b) => a + b.workTime, 0);
      const hours = `${taskHours}(h)`;
      return {
        name,
        hours,
      };
    });
    const filteredTask = task.filter((v) => v.hours !== "0(h)");
    return {
      name: v.name,
      value,
      task: filteredTask,
    };
  });
  return result;
};

/**
 * メインページで過去一ヶ月に稼働があるタスクの進捗を取得するロジック
 */
export const getLastMonthTaskProgress = async () => {
  const data = await prisma.task.findMany({
    where: {
      // 一ヶ月以内に更新があるタスクに絞る
      updatedAt: { gte: subMonths(new Date(), 1), lte: new Date() },
    },
    select: {
      id: true,
      name: true,
      progress: true,
    },
  });
  const result: MainPageTaskTable[] = data
    .sort((a, b) => b.progress - a.progress)
    .map((v) => {
      return { ...v, progress: `${v.progress}%` };
    });
  return result;
};
