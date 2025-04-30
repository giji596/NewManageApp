import { lastDayOfMonth } from "date-fns";
import { useCallback, useState } from "react";

type Props = {
  /** 初期値(year) */
  initYear: number;
  /** 初期値(month) */
  initMonth: number;
  /** 初期値(day) */
  initDay: number;
};

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

const getLastDay = (year: number, month: number) => {
  const lastDate = lastDayOfMonth(new Date(year, month - 1));
  return lastDate.getDate();
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
      if (v === todayYear) {
        // month>todayMonthとなる場合todayMonthに変更させる
        if (month > todayMonth) {
          setMonth(todayMonth);
          // 加えて、day>todayDayとなる場合はtodayDayに変更する
          if (day > todayDay) {
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
      if (v === todayMonth) {
        // 年が今年かチェック
        if (year === todayYear) {
          // day>todayDayとなる場合はtodayDayに変更する
          if (day > todayDay) {
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
