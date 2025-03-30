import { useCallback, useState } from "react";

/**
 * 日ごとの一覧ページのテーブルコンポーネントのロジック部分
 */
export default function DailyTableLogic() {
  const [selected, setSelected] = useState<string>("日付");
  const [isAsc, setIsAsc] = useState<boolean>(true);

  // 該当するタイトルが選択中か調べる
  const isSelected = useCallback(
    (title: string): boolean => title == selected,
    [selected]
  );

  // プロパティをソート設定する関数
  const handleSort = useCallback(
    (title: string): void => {
      // 選択中の場合:ascとdescを入れ替える
      if (isSelected(title)) {
        setIsAsc(!isAsc);
      } else {
        setSelected(title);
        setIsAsc(true);
      }
    },
    [isAsc, isSelected]
  );

  return {
    /** 現在昇順かどうか */
    isAsc,
    /** 選択中かどうか調べる関数 */
    isSelected,
    /** ソートする関数 */
    handleSort,
  };
}
