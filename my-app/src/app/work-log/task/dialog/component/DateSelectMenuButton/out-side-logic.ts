import {
  getLastDay,
  getTodayDay,
  getTodayMonth,
  isOverTodayDay,
  isOverTodayMonth,
  isTodayMonth,
  isTodayYear,
} from "@/lib/date";
import { useCallback, useState } from "react";

type Props = {
  /** 初期値(year) */
  initYear: number;
  /** 初期値(month) */
  initMonth: number;
  /** 初期値(day) */
  initDay: number;
};

/**
 * (ボタン使用側用のカスタムフック)フォームの値の管理に関するロジックまとめ
 */
export const useDateSelectMenuButton = ({
  initYear,
  initMonth,
  initDay,
}: Props) => {
  const [year, setYear] = useState<number>(initYear);
  const [month, setMonth] = useState<number>(initMonth);
  const [day, setDay] = useState<number>(initDay);

  const onChangeYear = useCallback(
    (v: number) => {
      // 年を変更
      setYear(v);
      // 今年に変えた場合,範囲外(今日の日付以降)になるなら変更させる
      if (isTodayYear(v)) {
        // month>todayMonthとなる場合todayMonthに変更させる
        if (isOverTodayMonth(month)) {
          const todayMonth = getTodayMonth();
          setMonth(todayMonth);
          // 加えて、day>todayDayとなる場合はtodayDayに変更する
          if (isOverTodayDay(day)) {
            const todayDay = getTodayDay();
            setDay(todayDay);
          }
        }
        // 今年以外
      } else {
        // その年の月の最終日より前か調べて超えるなら最終日にする
        const lastDay = getLastDay(v, month);
        if (day > lastDay) {
          setDay(lastDay);
        }
      }
    },
    [day, month]
  );
  const onChangeMonth = useCallback(
    (v: number) => {
      // 月を変更
      setMonth(v);
      // 今月に変えた場合、dayが範囲外にいかないかチェックする
      if (isTodayMonth(v)) {
        // 年が今年かチェック
        if (isTodayYear(year)) {
          // day>todayDayとなる場合はtodayDayに変更する
          if (isOverTodayDay(day)) {
            const todayDay = getTodayDay();
            setDay(todayDay);
          }
        }
        // 今年以外
      } else {
        // その年の月の最終日より前か調べて超えるなら最終日にする
        const lastDay = getLastDay(year, v);
        if (day > lastDay) {
          setDay(lastDay);
        }
      }
    },
    [day, year]
  );
  const onChangeDay = useCallback((v: number) => {
    // 日を変更
    setDay(v);
  }, []);

  return {
    /** 年 */
    year,
    /** 年を変更する関数 */
    onChangeYear,
    /** 月 */
    month,
    /** 月を変更する関数 */
    onChangeMonth,
    /** 日 */
    day,
    /** 日を変更する関数 */
    onChangeDay,
  };
};
