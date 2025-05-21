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
  const nullableTagId = tagId === 0 ? undefined : tagId;

  // 更新するデータを構築
  const updateData: Partial<{ title: string; text: string; tagId: number }> =
    {};
  if (title !== undefined) updateData.title = title;
  if (text !== undefined) updateData.text = text;
  if (tagId !== undefined) updateData.tagId = nullableTagId;

  // データを更新
  await db.memos.update(id, updateData);

  return id;
};
