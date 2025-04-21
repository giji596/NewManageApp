import { SelectChangeEvent } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { DateDetail } from "@/type/Date";
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

  // TODO:データフェッチさせる
  const dateDetails: DateDetail = {
    id: 0,
    date: new Date(),
    categoryList: [
      {
        id: 0,
        name: "カテゴリ1",
        taskList: [
          { id: 0, name: "タスク1", percent: "80%" },
          { id: 1, name: "タスク2", percent: "20%" },
        ],
        percent: "60%",
      },
      {
        id: 1,
        name: "カテゴリ2",
        taskList: [
          { id: 0, name: "タスク3", percent: "80%" },
          { id: 1, name: "タスク4", percent: "20%" },
        ],
        percent: "30%",
      },
      {
        id: 2,
        name: "カテゴリ3",
        taskList: [
          { id: 0, name: "タスク5", percent: "80%" },
          { id: 1, name: "タスク6", percent: "20%" },
        ],
        percent: "10%",
      },
    ],
    memoList: [
      { id: 0, title: "メモ1" },
      { id: 1, title: "メモ2" },
      { id: 2, title: "メモ3" },
      { id: 3, title: "メモ4" },
      { id: 4, title: "メモ5" },
      { id: 5, title: "メモ6" },
      { id: 6, title: "メモ7" },
      { id: 7, title: "メモ8" },
      { id: 8, title: "メモ9" },
    ],
  };
  const isLoading = false;
  // TODO:データフェッチ時に詳しくは考える イメージとしてはこれが呼ばれると再度フェッチする！みたいな
  const onFetchData = useCallback(
    (params: { year?: number; month?: number; day?: number }) => {
      console.log(params);
    },
    []
  );

  const onChangeRadioSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if ((RadioSelectSet as readonly string[]).includes(target)) {
        setRadioSelect(target as RadioSelect);
        // 値によって、データフェッチを行う
        switch (target) {
          case "昨日":
            onFetchData({
              year: yesterdayYear,
              month: yesterdayMonth,
              day: yesterdayDate,
            });
            break;
          case "一昨日":
            onFetchData({
              year: dayBeforeYesterdayYear,
              month: dayBeforeYesterdayMonth,
              day: dayBeforeYesterdayDate,
            });
            break;
          case "指定する":
            onFetchData({
              year: selectYear,
              month: selectMonth,
              day: selectDay,
            });
            break;
          default:
            console.log("ターゲット外なので、どっかおかしい?");
        }
      } else {
        console.log("ラジオボタンに型定義外の値が与えられとる"); // FIXME:リリース時には削除
      }
    },
    [onFetchData, selectDay, selectMonth, selectYear]
  );

  const onSelectYear = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      setSelectYear(Number(target));
      onFetchData({ year: Number(target) });
    },
    [onFetchData]
  );

  const onSelectMonth = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      setSelectMonth(Number(target));
      onFetchData({ month: Number(target) });
    },
    [onFetchData]
  );

  const onSelectDay = useCallback(
    (e: SelectChangeEvent) => {
      const target = e.target.value;
      setSelectDay(Number(target));
      onFetchData({ day: Number(target) });
    },
    [onFetchData]
  );

  return {
    /** 特定の日付詳細データのダイアログ用データ */
    dateDetails,
    /** ロード状態か */
    isLoading,
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
