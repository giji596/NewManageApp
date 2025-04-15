import { SelectChangeEvent } from "@mui/material";
import {
  getDate,
  getMonth,
  getYear,
  setDate,
  setMonth,
  setYear,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** 開始期間の初期値 */
  initialStartDate: Date;
  /** 終了期間の初期値 */
  initialEndDate: Date;
};

const today = new Date();
const todayYear = getYear(today);
const todayMonth = getMonth(today) + 1;
const todayDay = getDate(today);

/** 年を変える際に変更後の日付を取得する関数(選択範囲(今日の日付)を超えないようにするために使用)
 * @param 変更前の日付(initialDate)と変更後の年の値(v)
 * @return 変更後の日付(Date)
 */
const getDateOnChangeYear = (initialDate: Date, v: number) => {
  const newDate = setYear(initialDate, v);
  // 変更先のyearが今年の場合
  if (v === todayYear) {
    // initialDateの月が今月以降かを調べる
    const month = getMonth(initialDate) + 1;
    if (todayMonth < month) {
      // 以降であれば選択範囲を超えないように月を変更する
      newDate.setMonth(todayMonth - 1);
    }
    // 月と同様に日についても調べる
    const day = getDate(initialDate);
    if (todayDay < day) {
      // 以降であれば選択範囲を超えないように日を変更する
      newDate.setDate(todayDay);
    }
  }
  // 日付を返す(年が一致しない場合は年のみ変更、一致する場合は月または日を必要に応じて変換)
  return newDate;
};

/** 月を変える際に変更後の日付を取得する関数(選択範囲(今日の日付)を超えないようにするために使用)
 * @param 変更前の日付(initialDate)と変更後の年の値(v)
 * @return 変更後の日付(Date)
 */
const getDateOnChangeMonth = (initialDate: Date, v: number) => {
  const newDate = setMonth(initialDate, v - 1);
  // 変更先のmonthが現在の月と一緒の場合
  if (v === todayMonth) {
    // 年についても一緒か調べる
    const year = getYear(initialDate);
    if (year === todayYear) {
      // 年と月が一致する場合、日が今日以降か調べる
      const day = getDate(initialDate);
      if (todayDay < day) {
        // 今日以降であれば、選択範囲を超えないように日を変更する
        newDate.setDate(todayDay);
      }
    }
  }
  return newDate;
};

/**
 * 表示期間を選択するダイアログのロジック
 */
export default function PeriodSelectDialogLogic({
  initialStartDate,
  initialEndDate,
}: Props) {
  // 開始期間
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const startYear = useMemo(() => getYear(startDate), [startDate]);
  const startMonth = useMemo(() => getMonth(startDate) + 1, [startDate]);
  const startDay = useMemo(() => getDate(startDate), [startDate]);
  const handleChangeStartYear = useCallback((e: SelectChangeEvent) => {
    setStartDate((prev) => {
      const newDate = getDateOnChangeYear(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeStartMonth = useCallback((e: SelectChangeEvent) => {
    setStartDate((prev) => {
      const newDate = getDateOnChangeMonth(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeStartDay = useCallback((e: SelectChangeEvent) => {
    setStartDate((prev) => {
      const newDate = setDate(prev, Number(e.target.value));
      return newDate;
    });
  }, []);

  // 終了期間
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const endYear = useMemo(() => getYear(endDate), [endDate]);
  const endMonth = useMemo(() => getMonth(endDate) + 1, [endDate]);
  const endDay = useMemo(() => getDate(endDate), [endDate]);
  const handleChangeEndYear = useCallback((e: SelectChangeEvent) => {
    setEndDate((prev) => {
      const newDate = getDateOnChangeYear(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeEndMonth = useCallback((e: SelectChangeEvent) => {
    setEndDate((prev) => {
      const newDate = getDateOnChangeMonth(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeEndDay = useCallback((e: SelectChangeEvent) => {
    setEndDate((prev) => {
      const newDate = setDate(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  return {
    /** 開始年 */
    startYear,
    /** 開始月 */
    startMonth,
    /** 開始日 */
    startDay,
    /** 開始年を変更するハンドラー */
    handleChangeStartYear,
    /** 開始月を変更するハンドラー */
    handleChangeStartMonth,
    /** 開始日を変更するハンドラー */
    handleChangeStartDay,
    /** 終了年 */
    endYear,
    /** 終了月 */
    endMonth,
    /** 終了日 */
    endDay,
    /** 終了年を変更するハンドラー */
    handleChangeEndYear,
    /** 終了月を変更するハンドラー */
    handleChangeEndMonth,
    /** 終了日を変更するハンドラー */
    handleChangeEndDay,
  };
}
