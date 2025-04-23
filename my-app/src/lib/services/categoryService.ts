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
