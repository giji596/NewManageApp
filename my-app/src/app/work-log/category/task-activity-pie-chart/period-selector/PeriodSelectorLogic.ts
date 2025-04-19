import { format } from "date-fns";
import { useMemo } from "react";

type Props = {
  /** selectRange:"select"時の開始範囲 */
  startDate: Date;
  /** selectRange:"select"時の終了範囲 */
  endDate: Date;
};

/**
 * カテゴリ内のタスクの稼働を表示するグラフの期間を選択するラジオグループのロジック
 */
export default function PeriodSelectorLogic({ startDate, endDate }: Props) {
  const selectDateString = useMemo(() => {
    const startDateString = format(startDate, "yyyy/MM/dd");
    const endDateString = format(endDate, "yyyy/MM/dd");
    return `${startDateString} 〜 ${endDateString}`;
  }, [startDate, endDate]);
  return {
    /** select時の開始期間~終了期間のstring */
    selectDateString,
  };
}
