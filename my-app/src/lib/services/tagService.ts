import { TagEditListItem } from "@/type/Tag";
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
