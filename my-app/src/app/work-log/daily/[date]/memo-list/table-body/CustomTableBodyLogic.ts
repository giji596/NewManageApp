import { useMemo } from "react";

type Props = {
  /** ハイライトされてるか(選択中のタスクのメモであるか) */
  isHighlighted: boolean;
};

/**
 * 日次詳細 - メモリストのテーブルボディコンポーネントのロジック
 */
export const CustomTableBodyLogic = ({ isHighlighted }: Props) => {
  const backgroundColor = useMemo(
    // ハイライト時には薄い青色 (選択時はselectedによって上書きされるので注意)
    () => (isHighlighted ? "table.highlighted" : ""),
    [isHighlighted]
  );
  return {
    /** 背景色(ハイライト時に薄い青を表示 選択時についてはMUI側で制御させる(selectedオプションで)) */
    backgroundColor,
  };
};
