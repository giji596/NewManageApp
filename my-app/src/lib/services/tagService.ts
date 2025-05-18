import { TagEditListItem, TagUsage } from "@/type/Tag";
import prisma from "../prisma";

/**
 * 使用状況つきでタグを取得するメソッド(タグ編集時のリストデータを取得)
 */
export const getTagWithUsage = async () => {
  const data = await prisma.memoTag.findMany({
    select: {
      id: true,
      name: true,
      memos: {
        take: 1, // 利用先の一つだけ取得して使用状況を区別する
        select: { id: true }, // データの中身は使わないのでなんでもok
      },
    },
  });
  // データを整形
  const result: TagEditListItem[] = data.map((v) => {
    const { id, name } = v;
    // 使用状況はmemosの長さが0=未使用,1=使用中として判別
    const isUsed = v.memos.length === 1;
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
  const data = await prisma.memoTag.findUnique({
    where: { id },
    select: {
      // 5件だけ取得
      memos: { take: 5, select: { title: true } },
      // ここで使用先の数を取得
      _count: {
        select: {
          memos: true,
        },
      },
    },
  });
  if (data) {
    const memoTitles = data.memos.map((v) => v.title);
    const usageCount = data._count.memos;
    return { memoTitles, usageCount };
  }
  // データない場合(例外処理)
  return null;
};

/**
 * タグを削除するロジック
 */
export const deleteTag = async (id: number) => {
  const data = await prisma.memoTag.delete({
    where: { id },
    select: { id: true },
  });
  return data;
};
