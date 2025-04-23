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
