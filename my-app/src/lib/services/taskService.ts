import {
  CalendarDateMap,
  MainPageTaskTable,
  TaskDetail,
  TaskOption,
  TaskSummary,
  TaskSummaryRangeQuery,
} from "@/type/Task";
import prisma from "../prisma";
import { getDate, getMonth, getYear, subMonths } from "date-fns";
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
  const { progress, firstActivityDate, lastActivityDate, activeOnly } =
    query ?? {}; // undefinedの場合{}となり、参照keyがないので左辺の全てのkeyはundefinedになる
  const data = await prisma.task.findMany({
    // クエリがある場合のみ検証(...(false)の場合は検証しない)
    where: {
      progress: {
        gte: progress?.split(",").map((v) => Number(v))[0] ?? 0, // クエリ分割した前の方の進捗
        lte: progress?.split(",").map((v) => Number(v))[1] ?? 90, // クエリ分割した後の方の進捗
      },
      ...(firstActivityDate !== undefined && {
        firstActivityDate: {
          gte: firstActivityDate.split(",").map((v) => new Date(v))[0], // クエリ分割した前の方の日付
          lte: firstActivityDate.split(",").map((v) => new Date(v))[1], // クエリ分割した後の方の日付
        },
      }),
      ...(lastActivityDate !== undefined && {
        updatedAt: {
          gte: lastActivityDate.split(",").map((v) => new Date(v))[0], // クエリ分割した前の方の日付
          lte: lastActivityDate.split(",").map((v) => new Date(v))[1], // クエリ分割した後の方の日付
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
      firstActivityDate: true,
      lastActivityDate: true,
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
      firstActivityDate: task.firstActivityDate,
      lastActivityDate: task.lastActivityDate,
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
  isFavorite: boolean
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
    data: {
      name,
      categoryId,
      isFavorite,
      progress: 0,
    },
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
      firstActivityDate: true,
      lastActivityDate: true,
    },
  });
  if (data) {
    // 総稼働時間は計算
    const totalHours = data.tasks.reduce((a, b) => a + b.workTime, 0);
    // 稼働日付の一覧
    const dateList = data.tasks.map((v) => v.date);
    // 送信用のデータを作成
    const workDateList: CalendarDateMap = {};
    // 各日付について検証
    for (const date of dateList) {
      const year = getYear(date);
      const month = getMonth(date) + 1; // 1-indexed
      const day = getDate(date);
      // 年と月からkeyを作成
      const key = `${year}-${month}`;
      // 対応するkeyがなければ新規作成
      if (!workDateList[key]) {
        workDateList[key] = [];
      }
      // keyに日をpushで追加する
      workDateList[key].push(day);
    }
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
      firstActivityDate: data.firstActivityDate?.toISOString() ?? null,
      lastActivityDate: data.lastActivityDate?.toISOString() ?? null,
      memo: memos,
      workDateList,
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
      id: true,
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
      id: v.id,
      name: v.name,
      value,
      task: filteredTask,
    };
  });
  return result.filter((v) => v.value !== 0);
};

/**
 * メインページで過去一ヶ月に稼働があるタスクの進捗を取得するロジック
 */
export const getLastMonthTaskProgress = async () => {
  const data = await prisma.task.findMany({
    where: {
      // 一ヶ月以内に更新があるタスクに絞る
      lastActivityDate: { gte: subMonths(new Date(), 1), lte: new Date() },
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

/**
 * 指定された日時に基づいて、タスクの firstActivityDate および lastActivityDate を必要に応じて更新します。
 * - firstActivityDate が未設定、または指定日時より後であれば、指定日時に更新します。
 * - lastActivityDate が未設定、または指定日時より前であれば、指定日時に更新します。
 */
export const updateTaskActivityDatesIfNeeded = async (
  date: Date,
  taskId: number
) => {
  // タスクの更新日を取得
  const target = await prisma.task.findUnique({
    where: { id: taskId },
    select: { firstActivityDate: true, lastActivityDate: true },
  });
  // 更新データ用のオブジェクトを作成
  const updateData: Record<"first" | "last", Date | null> = {
    first: null,
    last: null,
  };
  // 開始日について、対象のタスクが存在しかつ開始日がないか未来の日付の場合に更新処理のキューに含める
  if (
    target &&
    (target.firstActivityDate === null ||
      target.firstActivityDate.getTime() > date.getTime())
  ) {
    updateData.first = date; // updateDataに含める
  }
  // 最終実施日について、対象のタスクが存在しかつ更新日がないか過去の日付の場合に更新処理のキューに含める
  if (
    target &&
    (target.lastActivityDate === null ||
      target.lastActivityDate.getTime() < date.getTime())
  ) {
    updateData.last = date; // updateDataに含める
  }
  // updateData[key]のいずれかがnullでない場合は以下の更新処理を行う
  if (updateData.first || updateData.last)
    await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(updateData.first !== null && {
          firstActivityDate: updateData.first,
        }),
        ...(updateData.last !== null && {
          lastActivityDate: updateData.last,
        }),
      },
    });
};

/**
 * 指定された日時が、タスクの firstActivityDate または lastActivityDate と一致する場合に、
 * タスクログの削除や移動（taskId の変更）によって失われた日付情報を補うため、
 * 該当する日付を次に新しい日時に更新します。
 *
 * - firstActivityDate と一致する場合は、それより後の最も古い日時に更新します。
 * - lastActivityDate と一致する場合は、それより前の最も新しい日時に更新します。
 *
 * タスクログ削除や再割り当て後の整合性維持に使用されます。
 */
export const adjustTaskActivityDatesIfRemoved = async (
  deletedDate: Date,
  taskId: number
) => {
  // タスクの日付を取得
  const target = await prisma.task.findUnique({
    where: { id: taskId },
    select: { firstActivityDate: true, lastActivityDate: true },
  });
  // 更新データをオブジェクトで宣言
  // undefined: 更新しない, null: nullに更新, Date: 新しい日付で更新
  const updateData: Record<"first" | "last", Date | null | undefined> = {
    first: undefined,
    last: undefined,
  };
  // firstActivityDate が削除対象と一致 → 最も古い他のログを探す
  if (target?.firstActivityDate?.getTime() === deletedDate.getTime()) {
    const previous = await prisma.taskLog.findFirst({
      where: { taskId },
      orderBy: { date: "asc" },
      select: { date: true },
    });
    // 更新のキューに加える(ログが一つもない場合はnullを与える)
    updateData.first = previous?.date ?? null;
  }
  // lastActivityDate が削除対象と一致 → 最も新しい他のログを探す
  if (target?.lastActivityDate?.getTime() === deletedDate.getTime()) {
    const previous = await prisma.taskLog.findFirst({
      where: { taskId },
      orderBy: { date: "desc" },
      select: { date: true },
    });
    // 更新のキューに加える(ログが一つもない場合はnullを与える)
    updateData.last = previous?.date ?? null;
  }
  await prisma.task.update({
    where: { id: taskId },
    data: {
      ...(typeof updateData.first !== "undefined" && {
        firstActivityDate: updateData.first,
      }),
      ...(typeof updateData.last !== "undefined" && {
        lastActivityDate: updateData.last,
      }),
    },
  });
};
