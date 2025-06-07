import { localClient } from "@/lib/localClient";
import {
  CategoryCompareGraphData,
  CategoryLineGraphData,
  CategoryLineGraphDataInfo,
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";
import { differenceInCalendarDays, subWeeks } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

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
  const query = new URLSearchParams({
    displayTarget: displayTarget,
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  });
  const { data } = useSWR(
    ["api/work-log/categories/comparison", query.toString()],
    localClient.work_log.categories.comparison.get({
      query: {
        displayTarget: displayTarget,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
    })
  );
  const rawData = useMemo(() => data ?? [], [data]);

  // ヘッダー用
  const initialCategoryFilterList: Record<
    string,
    {
      checked: boolean;
      color: string;
    }
  > = useMemo(() => {
    const record: Record<string, { checked: boolean; color: string }> = {};
    rawData.forEach((d, idx) => {
      record[d.name] = {
        checked: idx < 10 ? true : false, // 最大10項目までは初期から表示
        color: d.color,
      };
    });
    return record;
  }, [rawData]);

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

  const visibleKeys = useMemo(
    () =>
      categoryFilterList
        ? Object.fromEntries(
            Object.entries(categoryFilterList).map(([key, { checked }]) => [
              key,
              checked,
            ])
          )
        : {},
    [categoryFilterList]
  );

  const toggleCategoryFilter = useCallback((name: string) => {
    setCategoryFilterList((prev) => {
      if (prev && prev[name]) {
        prev[name].checked = !prev[name].checked;
      }
      return { ...prev };
    });
  }, []);

  const top3Categories: CategoryCompareGraphData[] = useMemo(() => {
    const rawTop3Data = rawData.slice(0, 3);
    return rawTop3Data.map((v) => ({
      id: v.id,
      name: v.name,
      color: v.color,
      value: v.values.reduce((a, b) => a + b.value, 0),
    }));
    //
  }, [rawData]);
  // グラフ表示用
  const graphData = useMemo(() => {
    // [日付][id]=valueの形式でオブジェクト化
    const record: Record<string, Record<number, number>> = {};
    // 各カテゴリについて
    rawData.forEach((d) => {
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
  }, [rawData]);

  const graphDataInfo: CategoryLineGraphDataInfo[] = useMemo(() => {
    return rawData.map((v) => ({
      key: v.id,
      name: v.name,
      color: v.color,
    }));
  }, [rawData]);

  // ナビゲーション関連
  const router = useRouter();
  const setCategoryQuery = useCallback(
    (id: number) => {
      // idからクエリ作成
      const params = new URLSearchParams();
      params.set("categoryId", id.toString());
      console.log("ぱらめーた", params.toString());
      // クエリを置き換え(詳細表示の方を切り替える)
      router.replace(params.toString());
    },
    [router]
  );
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
    /** key:カテゴリ名,value:表示/非表示 のオブジェクト */
    visibleKeys,
    /** ヘッダーのトップ３のカテゴリデータ */
    top3Categories,
    /** グラフ表示用のデータ */
    graphData,
    /** グラフ表示用のデータの情報 */
    graphDataInfo,
    /** クエリパラメータにセットする関数 */
    setCategoryQuery,
  };
};
