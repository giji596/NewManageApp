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
import { useDateSelect } from "@/hook/useDateSelect";
import { localClient } from "@/lib/localClient";
import useSWR from "swr";

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
  const {
    year,
    onChangeYear,
    month,
    onChangeMonth,
    day,
    onChangeDay,
    dateParam,
  } = useDateSelect({
    initYear: yesterdayYear,
    initMonth: yesterdayMonth,
    initDay: yesterdayDate,
  });

  const selectableYearArray = useMemo(() => getYearSelectArray(), []);
  const selectableMonthArray = useMemo(() => getMonthSelectArray(year), [year]);
  const selectableDayArray = useMemo(
    () => getDaySelectArray(year, month),
    [year, month]
  );

  const { data: dateDetails, isLoading } = useSWR(
    `work-log/daily/summary/detail?date=${dateParam}`,
    localClient.work_log.daily.summary.detail.get({
      query: { date: dateParam },
    })
  );

  const onChangeRadioSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if ((RadioSelectSet as readonly string[]).includes(target)) {
        setRadioSelect(target as RadioSelect);
        // 値によって、データフェッチを行う
        switch (target) {
          case "昨日":
            onChangeYear(yesterdayYear);
            onChangeMonth(yesterdayMonth);
            onChangeDay(yesterdayDate);
            break;
          case "一昨日":
            onChangeYear(dayBeforeYesterdayYear);
            onChangeMonth(dayBeforeYesterdayMonth);
            onChangeDay(dayBeforeYesterdayDate);
            break;
          case "指定する":
            break;
        }
      }
    },
    [onChangeDay, onChangeMonth, onChangeYear]
  );

  const onSelectYear = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      onChangeYear(Number(target));
    },
    [onChangeYear]
  );

  const onSelectMonth = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      onChangeMonth(Number(target));
    },
    [onChangeMonth]
  );

  const onSelectDay = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      onChangeDay(Number(target));
    },
    [onChangeDay]
  );

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
    year,
    /** セレクトの月の値 */
    month,
    /** セレクトの日の値 */
    day,
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
