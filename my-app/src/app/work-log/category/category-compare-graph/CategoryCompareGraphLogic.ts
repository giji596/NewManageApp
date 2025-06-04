import { DUMMY_CATEGORY_COMPARE_GRAPH_DATA } from "@/dummy/category-page";
import {
  CategoryCompareGraphData,
  CategoryLineGraphData,
  CategoryLineGraphDataInfo,
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";
import { differenceInCalendarDays, subWeeks } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const data = useMemo(
    () =>
      DUMMY_CATEGORY_COMPARE_GRAPH_DATA.sort(
        (a, b) =>
          // TODO:ソートは実際はリクエスト先で行う
          b.values.reduce((c, d) => c + d.value, 0) -
          a.values.reduce((c, d) => c + d.value, 0)
      ),
    []
  );

  // ヘッダー用
  const initialCategoryFilterList: Record<
    string,
    {
      checked: boolean;
      color: string;
    }
  > = useMemo(() => {
    const record: Record<string, { checked: boolean; color: string }> = {};
    data.forEach((d, idx) => {
      record[d.name] = {
        checked: idx < 10 ? true : false, // 最大10項目までは初期から表示
        color: d.color,
      };
    });
    return record;
  }, [data]);

  const [categoryFilterList, setCategoryFilterList] = useState<Record<
    string,
    {
      checked: boolean;
      color: string;
    }
  > | null>(null);

  // データフェッチ後の初期化処理
  useEffect(() => {
    if (initialCategoryFilterList) {
      // 一応nullの場合のみセット処理
      setCategoryFilterList((prev) =>
        prev === null ? initialCategoryFilterList : prev
      );
    }
  }, [initialCategoryFilterList]);

  const toggleCategoryFilter = useCallback((name: string) => {
    setCategoryFilterList((prev) => {
      if (prev && prev[name]) {
        prev[name].checked = !prev[name].checked;
      }
      return { ...prev };
    });
  }, []);
  const top3Categories: CategoryCompareGraphData[] = useMemo(() => {
    const rawTop3Data = data.slice(0, 3);
    return rawTop3Data.map((v) => ({
      id: v.id,
      name: v.name,
      color: v.color,
      value: v.values.reduce((a, b) => a + b.value, 0),
    }));
    //
  }, [data]);
  // グラフ表示用
  const graphData = useMemo(() => {
    // [日付][id]=valueの形式でオブジェクト化
    const record: Record<string, Record<number, number>> = {};
    // 各カテゴリについて
    data.forEach((d) => {
      // 各日付について
      d.values.forEach((v) => {
        // 日付データがなければ作成
        if (!record[v.date]) record[v.date] = {};
        // 日付データのバリューにセットする
        record[v.date][d.id] = v.value;
      });
    });
    // オブジェクトを展開してlineChart用に変換
    const result: CategoryLineGraphData[] = Object.entries(record).map(
      ([date, values]) => {
        return {
          date,
          ...values,
        };
      }
    );
    return result;
  }, [data]);

  const graphDataInfo: CategoryLineGraphDataInfo[] = useMemo(() => {
    return data.map((v) => ({
      key: v.id,
      name: v.name,
      color: v.color,
    }));
  }, [data]);
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
    /** カテゴリのフィルターリスト(trueで表示) */
    categoryFilterList,
    /** カテゴリのフィルターの切り替え関数 */
    toggleCategoryFilter,
    /** ヘッダーのトップ３のカテゴリデータ */
    top3Categories,
    /** グラフ表示用のデータ */
    graphData,
    /** グラフ表示用のデータの情報 */
    graphDataInfo,
  };
};
