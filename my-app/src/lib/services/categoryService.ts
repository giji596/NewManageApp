import { CategoryOption } from "@/type/Category";
import prisma from "../prisma";

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
 * 新規カテゴリの作成
 */
export const createCategory = async (name: string) => {
  const data = await prisma.category.create({
    data: {
      name,
    },
  });
  return data;
};
