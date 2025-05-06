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

/**
 * メモを更新するメソッド
 */
export const updateMemo = async (
  id: number,
  title?: string,
  text?: string,
  tagId?: number
) => {
  // tagIdが0の場合はnullに変換する(memoのtagIdはNull許容 かつtagId0の場合は未選択の場合なので)
  const nullableTagId = tagId === 0 ? null : tagId;
  const data = await prisma.memo.update({
    where: { id },
    data: {
      // あるデータだけ更新 (左辺falseだと処理なし)
      ...(title !== undefined && { title }),
      ...(text !== undefined && { text }),
      ...(tagId !== undefined && { tagId: nullableTagId }),
    },
    select: { id: true },
  });
  return data;
};

/**
 * メモを削除するメソッド
 */
export const deleteMemo = async (id: number) => {
  const data = await prisma.memo.delete({
    where: { id },
    select: { id: true },
  });
  return data;
};

/**
 * メモのタグを作成するメソッド
 */
export const createTag = async (tagName: string) => {
  // 被りのチェック(同様の名前のタグがある場合はnullを返す)
  const exist = await prisma.memoTag.findFirst({
    where: { name: tagName },
  });
  if (exist) {
    return null;
  }
  const data = await prisma.memoTag.create({
    data: { name: tagName },
    select: { id: true },
  });
  return data;
};
