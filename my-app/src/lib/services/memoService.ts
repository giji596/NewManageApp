import prisma from "../prisma";

/**
 * メモのタグ一覧取得するメソッド
 */
export const getMemoTags = async () => {
  const data = await prisma.memoTag.findMany();
  return data;
};
