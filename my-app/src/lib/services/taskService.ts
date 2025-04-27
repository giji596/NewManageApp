import { TaskOption, TaskSummary } from "@/type/Task";
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
 * タスク一覧ページのデータを取得する関数
 */
export const getTaskSummary = async (): Promise<TaskSummary[]> => {
  const data = await prisma.task.findMany({
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
