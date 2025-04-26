import prisma from "../prisma";

/**
 * メモ追加するメソッド
 */
export const createMemo = async (
  title: string,
  text: string,
  taskLogId: number,
  tagId?: number
) => {
  const data = await prisma.memo.create({
    data: {
      title,
      text,
      taskLogId,
      tagId,
    },
    select: {
      id: true,
    },
  });
  return data;
};
/**
 * メモのタグ一覧取得するメソッド
 */
export const getMemoTags = async () => {
  const data = await prisma.memoTag.findMany();
  return data;
};

/**
 * メモのbody部分を取得するメソッド
 */
export const getMemoBody = async (id: number) => {
  const data = await prisma.memo.findUnique({
    where: { id: id },
    select: {
      text: true,
    },
  });
  return data;
};
