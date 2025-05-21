import { TagEditListItem, TagUsage } from "@/type/Tag";
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
 * タグの使用先のメモ名と使用先の数を取得する関数
 */
export const getTagUsageMemoTitlesAndCount = async (
  id: number
): Promise<TagUsage | null> => {
  const memos = await db.memos.where("tagId").equals(id).toArray();
  if (memos.length > 0) {
    const memoTitles = memos.slice(0, 5).map((v) => v.title); // 5件だけ取得
    const usageCount = memos.length; // 使用先の数を取得
    return { memoTitles, usageCount };
  }
  // データない場合(例外処理)
  return null;
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

/**
 * タグ名を更新するロジック
 */
export const updateTagName = async (name: string, id: number) => {
  const exist = await db.memoTags.get(id);
  if (!exist) {
    throw new Error("Tag not found");
  }
  await db.memoTags.update(id, { name });
  return { id };
};
