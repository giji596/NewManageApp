import {
  CategoryCompareGraphData,
  CategoryLineGraphDisplay,
} from "@/type/Category";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** 表示対象 */
  displayTarget: CategoryLineGraphDisplay;
  /** 開始日 */
  startDate: Date;
  /** 終了日 */
  endDate: Date;
  /** カテゴリの一覧 */
  categoryList: CategoryCompareGraphData[];
};

/**
 * カテゴリ比較グラフの設定メニューのロジック
 */
export const CategoryLineGraphHeaderLogic = ({
  displayTarget,
  startDate,
  endDate,
  categoryList,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const dateRangeText = useMemo(() => {
    const startDateText = format(startDate, "yyyy/MM/dd");
    const endDateText = format(endDate, "yyyy/MM/dd");
    return `${startDateText} 〜 ${endDateText}`;
  }, [endDate, startDate]);

  const displayTargetText = useMemo(
    () => (displayTarget === "totalHours" ? "稼働時間" : "タスク数"),
    [displayTarget]
  );

  const top3Categories = categoryList.slice(0, 3);
  const getCategoryText = useCallback(
    (data: CategoryCompareGraphData, rank: number) => {
      const prefix = displayTarget === "totalHours" ? "時間" : "個";
      return `${rank}位 ${data.name} ${data.value}${prefix}`;
    },
    [displayTarget]
  );

  return {
    /** 設定メニューの展開状態 */
    expanded,
    /** 設定メニューの展開状態を切り替える */
    handleToggle,
    /** 日付のテキスト */
    dateRangeText,
    /** 表示対象のテキスト */
    displayTargetText,
    /** 上位3位内のカテゴリー */
    top3Categories,
    /** カテゴリーの表示テキストを取得する関数 */
    getCategoryText,
  };
};
