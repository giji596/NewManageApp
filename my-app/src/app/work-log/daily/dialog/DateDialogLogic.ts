import { SelectChangeEvent } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import {
  dayBeforeYesterdayDate,
  dayBeforeYesterdayMonth,
  dayBeforeYesterdayYear,
  getDaySelectArray,
  getMonthSelectArray,
  getYearSelectArray,
  yesterdayDate,
  yesterdayMonth,
  yesterdayYear,
} from "./params";
import useAspidaSWR from "@aspida/swr";
import apiClient from "@/lib/apiClient";

/**
 * ラジオ選択賜のstringのオブジェクト
 */
const RadioSelectSet = ["昨日", "一昨日", "指定する"] as const;

/**
 * daily-pageのダイアログ用のラジオボタンの型(型安全のため詳しく設定)
 */
type RadioSelect = (typeof RadioSelectSet)[number];

/**
 * 日付ダイアログコンポーネントのロジック
 */
export default function DataDialogLogic() {
  const [radioSelect, setRadioSelect] = useState<RadioSelect>("昨日");
  const [selectYear, setSelectYear] = useState<number>(yesterdayYear);
  const [selectMonth, setSelectMonth] = useState<number>(yesterdayMonth);
  const [selectDay, setSelectDay] = useState<number>(yesterdayDate);

  const selectableYearArray = useMemo(() => getYearSelectArray(), []);
  const selectableMonthArray = useMemo(
    () => getMonthSelectArray(selectYear),
    [selectYear]
  );
  const selectableDayArray = useMemo(
    () => getDaySelectArray(selectYear, selectMonth),
    [selectMonth, selectYear]
  );

  const dateParam = useMemo(
    () =>
      `${selectYear}-${selectMonth.toString().padStart(2, "0")}-${selectDay
        .toString()
        .padStart(2, "0")}`,
    [selectDay, selectMonth, selectYear]
  );
  const { data, isLoading } = useAspidaSWR(
    apiClient.work_log.daily.summary.detail,
    "get",
    { query: { date: dateParam } }
  );
  const dateDetails = data?.body;

  const onChangeRadioSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if ((RadioSelectSet as readonly string[]).includes(target)) {
        setRadioSelect(target as RadioSelect);
        // 値によって、データフェッチを行う
        switch (target) {
          case "昨日":
            setSelectYear(yesterdayYear);
            setSelectMonth(yesterdayMonth);
            setSelectDay(yesterdayDate);
            break;
          case "一昨日":
            setSelectYear(dayBeforeYesterdayYear);
            setSelectMonth(dayBeforeYesterdayMonth);
            setSelectDay(dayBeforeYesterdayDate);
            break;
          case "指定する":
            break;
          default:
            console.log("ターゲット外なので、どっかおかしい?");
        }
      } else {
        console.log("ラジオボタンに型定義外の値が与えられとる"); // FIXME:リリース時には削除
      }
    },
    []
  );

  const onSelectYear = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setSelectYear(Number(target));
  }, []);

  const onSelectMonth = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setSelectMonth(Number(target));
  }, []);

  const onSelectDay = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setSelectDay(Number(target));
  }, []);

  return {
    /** 特定の日付詳細データのダイアログ用データ */
    dateDetails,
    /** ロード状態か */
    isLoading,
    /** Dateのパラメータ形式のstring */
    dateParam,
    /** ラジオボタンの選択中の値 */
    radioSelect,
    /** セレクトの年の値 */
    selectYear,
    /** セレクトの月の値 */
    selectMonth,
    /** セレクトの日の値 */
    selectDay,
    /** 年の選択賜の配列 */
    selectableYearArray,
    /** 月の選択賜の配列 */
    selectableMonthArray,
    /** 日の選択賜の配列 */
    selectableDayArray,
    /** ラジオボタンの選択をvalueの値に変更する関数 */
    onChangeRadioSelect,
    /** 年を選択した際のハンドラー */
    onSelectYear,
    /** 月を選択した際のハンドラー */
    onSelectMonth,
    /** 日付を選択した際のハンドラー */
    onSelectDay,
  };
}
