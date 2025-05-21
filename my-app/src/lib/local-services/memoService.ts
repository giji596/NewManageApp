import { db } from "../dexie";

/**
 * メモ追加するメソッド
 */
export const createMemo = async (
  title: string,
  text: string,
  taskLogId: number,
  tagId?: number
) => {
  const id = await db.memos.add({
    title,
    text,
    taskLogId,
    tagId,
  });
  return id;
};
