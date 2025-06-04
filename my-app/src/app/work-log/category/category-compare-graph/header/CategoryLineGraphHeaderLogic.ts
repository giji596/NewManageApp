import { CategoryLineGraphDisplay } from "@/type/Category";
import { format } from "date-fns";
import { useMemo, useState } from "react";

type Props = {
  /** 表示対象 */
  displayTarget: CategoryLineGraphDisplay;
  /** 開始日 */
  startDate: Date;
  /** 終了日 */
  endDate: Date;
};

/**
 * カテゴリ比較グラフの設定メニューのロジック
 */
export const CategoryLineGraphHeaderLogic = ({
  displayTarget,
  startDate,
  endDate,
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

  return {
    /** 設定メニューの展開状態 */
    expanded,
    /** 設定メニューの展開状態を切り替える */
    handleToggle,
    /** 日付のテキスト */
    dateRangeText,
    /** 表示対象のテキスト */
    displayTargetText,
  };
};
