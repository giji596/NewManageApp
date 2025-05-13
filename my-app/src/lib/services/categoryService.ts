import {
  CategoryHeaderQuery,
  CategoryOption,
  CategorySummary,
} from "@/type/Category";
import prisma from "../prisma";
import { format, getTime, subMonths } from "date-fns";
import { CategoryTaskActivity, CategoryTaskList } from "@/type/Task";

/**
 * カテゴリ選択賜一覧取得
 */
export const getCategoryOptions = async (
  query?: CategoryHeaderQuery
): Promise<CategoryOption[]> => {
  const hideCompleted = query?.hideCompleted;
  // 最終更新日関連
  const startDate =
    // last-3-monthsなら3ヶ月前の日付
    query?.displayRange === "last-3-months"
      ? subMonths(new Date(), 3)
      : // startDateがある場合(custom)はその日付
      query?.startDate
      ? new Date(query.startDate)
      : // startDateがない場合(all | queryなし)ならundefined
        undefined;
  // 上記と同様に求める
  const endDate =
    query?.displayRange === "last-3-months"
      ? new Date()
      : query?.endDate
      ? new Date(query.endDate)
      : undefined;
  const data = await prisma.category.findMany({
    // hideCompleted=trueの場合はisCompleted:falseのものだけ取得する
    where: {
      ...(hideCompleted !== undefined && { isCompleted: false }),
    },
    select: {
      id: true,
      name: true,
      tasks: {
        select: {
          lastActivityDate: true,
        },
      },
    },
  });
  // 最終更新日を含めたフラットなデータに整形
  const latestData = data.map((v) => {
    // 最終更新日を取得
    const latest = v.tasks.reduce(
      (a, b) =>
        b.lastActivityDate
          ? getTime(a) < getTime(b.lastActivityDate)
            ? b.lastActivityDate
            : a
          : a,
      new Date("1990-01-01")
    );
    return { id: v.id, name: v.name, latestDate: latest };
  });
  // 日付範囲が指定されていない場合、新しい順にソートして返す
  if (!startDate || !endDate) {
    const sorted = latestData.sort(
      (a, b) => getTime(b.latestDate) - getTime(a.latestDate)
    );
    return sorted.map((v) => {
      return { id: v.id, name: v.name };
    });
  }
  // 日付範囲が指定されている場合、日付範囲外のものをフィルターする
  const filtered = latestData.filter(
    (v) => startDate <= v.latestDate && v.latestDate <= endDate
  );
  // 新しい順にソートする
  const sorted = filtered.sort(
    (a, b) => getTime(b.latestDate) - getTime(a.latestDate)
  );
  return sorted.map((v) => {
    return { id: v.id, name: v.name };
  });
};

/**
 * 新規カテゴリの作成 (重複がある場合はnullを返す)
 */
export const createCategory = async (name: string) => {
  // 重複チェック
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });
  if (existingCategory) {
    return null;
  }

  const data = await prisma.category.create({
    data: {
      name,
    },
  });
  return data;
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
  let startDate: Date | undefined;
  let lastDate: Date | undefined;
  switch (range) {
    // 全てであればstartDate/lastDateは変化なし(undefined)
    case "all":
      break;
    // 選択の場合はstart/endから取得(両方与えられてる前提)
    case "select":
      if (start && end) {
        startDate = new Date(start);
        lastDate = new Date(end);
      }
      break;
    // 先月(またはrangeがなし)の場合は先月までの範囲を指定
    case "last-month":
    default:
      startDate = subMonths(new Date(), 1);
      lastDate = new Date();
  }
  const data = await prisma.task.findMany({
    where: { categoryId: id },
    select: {
      name: true,
      tasks: {
        where: {
          ...(startDate !== undefined &&
            lastDate !== undefined && {
              date: {
                gte: startDate,
                lte: lastDate,
              },
            }),
          workTime: { not: 0 }, // 稼働のないデータを含めない
        },
        select: { workTime: true },
      },
    },
  });
  const result: CategoryTaskActivity[] = data
    .filter((v) => v.tasks.length !== 0) // 稼働データのないタスクは除外
    .map((v) => {
      const totalHours = v.tasks.reduce((a, b) => b.workTime + a, 0);
      return {
        taskName: v.name,
        totalHours: totalHours,
      };
    });
  return result;
};

/**
 * カテゴリないのタスク一覧取得するロジック
 */
export const getCategoryTasks = async (id: number) => {
  const data: CategoryTaskList[] = await prisma.task.findMany({
    where: { categoryId: id },
    select: { id: true, name: true, progress: true, isFavorite: true },
  });
  return data;
};

/**
 * カテゴリーの概要データを取得するロジック
 */
export const getCategorySummary = async (
  id: number
): Promise<CategorySummary | null> => {
  // カテゴリ関連のデータ取得
  const data = await prisma.category.findUnique({
    where: { id },
    select: {
      name: true,
      isCompleted: true,
      tasks: { select: { tasks: { select: { workTime: true } } } },
    },
  });
  // データない場合はnull返す(カテゴリ一覧から指定するはずなので想定されてないエラー)
  if (data === null) return null;
  // 通常
  // 開始日と最終更新日を取得する
  const startedAt = await prisma.task.findFirst({
    where: { categoryId: id },
    orderBy: { firstActivityDate: "asc" },
    select: { firstActivityDate: true },
  });
  const lastAt = await prisma.task.findFirst({
    where: { categoryId: id },
    orderBy: { lastActivityDate: "desc" },
    select: { lastActivityDate: true },
  });

  // stringに変換後にreturnの型定義の形にフォーマットする
  const startString =
    startedAt !== null && startedAt.firstActivityDate !== null
      ? format(startedAt.firstActivityDate, "yyyy/MM/dd")
      : "--------";
  const lastString =
    lastAt !== null && lastAt.lastActivityDate !== null
      ? format(lastAt.lastActivityDate, "yyyy/MM/dd")
      : "--------";
  const activeDate = `${startString}~${lastString}`;

  // 総稼働時間を計算
  const totalHours = data.tasks.reduce(
    (a, b) => a + b.tasks.reduce((c, d) => c + d.workTime, 0),
    0
  );

  // 整形してreturn
  return {
    name: data.name,
    isCompleted: data.isCompleted,
    totalHours,
    activeDate,
  };
};
