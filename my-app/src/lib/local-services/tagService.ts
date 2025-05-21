import { db } from "../dexie";

/**
 * メモのタグ一覧取得するメソッド
 */
export const getMemoTags = async () => {
  const data = await db.memoTags.toArray();
  return data;
};
