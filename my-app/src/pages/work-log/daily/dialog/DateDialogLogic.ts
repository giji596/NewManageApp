import { SelectChangeEvent } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import {
  currentMonth,
  currentYear,
  getDaySelectArray,
  getMonthSelectArray,
  getYearSelectArray,
  yesterday,
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
  const [open, setOpen] = useState<boolean>(false);
  const [radioSelect, setRadioSelect] = useState<RadioSelect>("昨日");
  const [selectYear, setSelectYear] = useState<number>(currentYear);
  const [selectMonth, setSelectMonth] = useState<number>(currentMonth);
  const [selectDay, setSelectDay] = useState<number>(yesterday);

  const selectableYearArray = useMemo(() => getYearSelectArray(), []);
  const selectableMonthArray = useMemo(
    () => getMonthSelectArray(selectYear),
    [selectYear]
  );
  const selectableDayArray = useMemo(
    () => getDaySelectArray(selectYear, selectMonth),
    [selectMonth, selectYear]
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onChangeRadioSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if ((RadioSelectSet as readonly string[]).includes(target)) {
        setRadioSelect(target as RadioSelect);
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
    /** 開閉状態 */
    open,
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
    /** */
    /**　ダイアログを閉じるハンドラー */
    onClose,
    /** ダイアログを開くハンドラー */
    onOpen,
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
