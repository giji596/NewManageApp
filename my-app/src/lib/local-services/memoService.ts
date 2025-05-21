import { db } from "../dexie";

/**
 * メモのbody部分を取得するメソッド
 */
export const getMemoBody = async (id: number) => {
  const memo = await db.memos.get(id);
  return memo ? { text: memo.text } : null;
};

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
