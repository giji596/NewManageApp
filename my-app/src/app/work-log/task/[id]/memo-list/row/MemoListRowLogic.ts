import { MemoTaskDetail } from "@/type/Memo";
import { format } from "date-fns";
import { useMemo } from "react";

type Props = {
  /** メモ */
  memoItem: MemoTaskDetail;
};

/**
 * タスク詳細ページ 行のコンポーネントのロジック
 */
export default function MemoListRowLogic({ memoItem }: Props) {
  // メモの日付のstring
  const dateString = useMemo(
    () => format(memoItem.date, "yyyy/MM/dd"),
    [memoItem.date]
  );

  return {
    /** メモの日付(string) */
    dateString,
  };
}
