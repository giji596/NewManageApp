import { CategoryOption } from "@/type/Category";
import prisma from "../prisma";
import { subMonths } from "date-fns";
import { CategoryTaskActivity, CategoryTaskList } from "@/type/Task";

/**
 * カテゴリ選択賜一覧取得
 */
export const getCategoryOptions = async () => {
  const data: CategoryOption[] = await prisma.category.findMany({
    select: { id: true, name: true },
  });
  return data;
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
        },
        select: { workTime: true },
      },
    },
  });
  const result: CategoryTaskActivity[] = data.map((v) => {
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
