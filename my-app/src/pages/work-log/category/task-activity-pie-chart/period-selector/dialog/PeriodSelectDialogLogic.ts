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
      const newDate = setYear(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeStartMonth = useCallback((e: SelectChangeEvent) => {
    setStartDate((prev) => {
      const newDate = setMonth(prev, Number(e.target.value));
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
      const newDate = setYear(prev, Number(e.target.value));
      return newDate;
    });
  }, []);
  const handleChangeEndMonth = useCallback((e: SelectChangeEvent) => {
    setEndDate((prev) => {
      const newDate = setMonth(prev, Number(e.target.value));
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
