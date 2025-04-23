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
