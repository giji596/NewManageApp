import { DUMMY_CATEGORY_COMPARE_GRAPH_DATA } from "@/dummy/category-page";
import {
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";
import { differenceInCalendarDays, subWeeks } from "date-fns";
import { useCallback, useMemo, useState } from "react";

/**
 * カテゴリ比較グラフのロジック
 */
export const CategoryCompareGraphLogic = () => {
  // 表示対象
  const [displayTarget, setDisplayTarget] =
    useState<CategoryLineGraphDisplay>("totalHours");
  const onChangeDisplayTarget = useCallback(
    (target: CategoryLineGraphDisplay) => {
      setDisplayTarget(target);
    },
    []
  );

  // 表示範囲
  // デフォ値は過去5週間
  const defaultStartDate = subWeeks(new Date(), 5);
  const defaultEndDate = new Date();
  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  const setDateRange = useCallback((start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  const timeUnit = useMemo((): CategoryLineGraphRange => {
    const dayCount = differenceInCalendarDays(endDate, startDate);
    if (dayCount <= 12) return "day";
    if (dayCount <= 84) return "week";
    return "month";
  }, [endDate, startDate]);

  // データ関連
  // TODO: フェッチさせる
  const data = useMemo(() => DUMMY_CATEGORY_COMPARE_GRAPH_DATA, []);

  return {
    /** 表示対象 */
    displayTarget,
    /** 表示対象変更時のハンドラー */
    onChangeDisplayTarget,
    /** 表示範囲の開始日 */
    startDate,
    /** 表示範囲の終了日 */
    endDate,
    /** 表示範囲変更時のハンドラー */
    setDateRange,
    /** 表示範囲の単位 */
    timeUnit,
  };
};
