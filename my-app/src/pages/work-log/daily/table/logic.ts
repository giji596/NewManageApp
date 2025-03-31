import { DateSummary } from "@/type/Date";
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
  const handleSetSortTarget = useCallback(
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

  // ソート関数
  const doSortByTitle = useCallback(
    (a: DateSummary, b: DateSummary) => {
      switch (selected) {
        case "メインカテゴリ":
          return isAsc
            ? a.categoryName.localeCompare(b.categoryName)
            : b.categoryName.localeCompare(a.categoryName);
        case "メインタスク":
          return isAsc
            ? a.taskName.localeCompare(b.taskName)
            : b.taskName.localeCompare(a.taskName);
        case "合計稼働時間":
          return isAsc
            ? a.dailyHours - b.dailyHours
            : b.dailyHours - a.dailyHours;
        case "日付":
          return isAsc
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        default:
          return 0;
      }
    },
    [isAsc, selected]
  );

  return {
    /** 現在昇順かどうか */
    isAsc,
    /** 選択中かどうか調べる関数 */
    isSelected,
    /** ソート対象を関数 */
    handleSetSortTarget,
    /** ソートする関数 */
    doSortByTitle,
  };
}
