import { TagEditListItem } from "@/type/Tag";
import { db } from "../dexie";

/**
 * メモのタグ一覧取得するメソッド
 */
export const getMemoTags = async () => {
  const data = await db.memoTags.toArray();
  return data;
};

/**
 * 使用状況つきでタグを取得するメソッド(タグ編集時のリストデータを取得)
 */
export const getTagWithUsage = async () => {
  const data = await db.memoTags.toArray();
  const memos = await db.memos.toArray();
  const result: TagEditListItem[] = data.map((v) => {
    const { id, name } = v;
    // 使用状況はmemosテーブルを参照して判別
    const isUsed = memos.some((memo) => memo.tagId === id);
    return {
      id,
      name,
      isUsed,
    };
  });
  return result;
};

/**
 * メモのタグを作成するメソッド
 */
export const createTag = async (tagName: string) => {
  // 被りのチェック(同様の名前のタグがある場合はnullを返す)
  const exist = await db.memoTags.where("name").equals(tagName).first();
  if (exist) {
    throw new Error("duplicate error");
  }
  const id = await db.memoTags.add({ name: tagName });
  return { id };
};
