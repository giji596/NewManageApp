import { TaskOption } from "@/type/Task";
import prisma from "../prisma";

/**
 * タスク選択賜一覧げっとする関数
 */
export const getTaskOptions = async (categoryId: number) => {
  const data: TaskOption[] = await prisma.task.findMany({
    where: { categoryId: categoryId },
    select: { id: true, name: true },
  });
  return data;
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
    data: { name, categoryId, isFavorite, progress: 0 },
    select: {
      id: true,
      name: true,
    },
  });
  return data;
};
