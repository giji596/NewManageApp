import { getDay, getDaysInMonth, startOfMonth } from "date-fns";
import { useCallback, useMemo } from "react";

/**月曜を 0 にするために、日曜(0) → 6、月曜(1) → 0...に変換 */
const getMondayStartIndex = (date: Date) => (getDay(date) + 6) % 7;

/** 特定の年月の月曜[0]~日曜[6]となるような週ごとのデータを取得(日付のない部分はnullを返す) */
const generateCalendarWeeks = (year: number, month: number) => {
  // 月初について取得
  const start = startOfMonth(new Date(year, month - 1));
  // 日数を求めてその分の配列を作成
  const daysInMonth = getDaysInMonth(start);
  const dayList = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // 始まりの位置をここで取得(月曜日:0番目~ 日曜日:6番目~)
  const startIndex = getMondayStartIndex(start);
  // 月曜~始まりの位置までの空欄を作成して結合する
  const empty: null[] = Array(startIndex).fill(null);
  const calenderDayList = [...empty, ...dayList];
  // 週ごとに分ける
  const weeks: (number | null)[][] = [];
  while (calenderDayList.length > 0) {
    const week = calenderDayList.splice(0, 7);
    // 最後の週のタイミングでは空欄をnullで埋める
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  return weeks;
};

type Props = {
  /** 表示中の年 */
  year: number;
  /** 表示中の月 */
  month: number;
};

/**
 * 稼働のカレンダーのボディ(日付表示)部分のロジック
 */
export const WorkCalendarBodyLogic = ({ year, month }: Props) => {
  // weeksはレンダー時に必ず変化するのでメモ化不要
  const weeks = generateCalendarWeeks(year, month);
  // TODO:データフェッチする or 親からもらう 検討する
  const clickableDays = useMemo(() => [2, 5, 11, 15, 20, 29], []);

  const isClickable = useCallback(
    (day: number) => clickableDays.some((d) => d === day),
    [clickableDays]
  );
  // レイアウト関連
  const boxSize = 40;
  const gap = 6;
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  return {
    /** 週ごとの日付(月~日曜日の7つごとの多重配列) 日付の入らない部分はnull */
    weeks,
    /** クリック可能かの判定 */
    isClickable,
    /** 日付のBoxのサイズ */
    boxSize,
    /** 日付のBox間の距離 */
    gap,
    /** １週間の表示文言の配列 */
    daysOfWeek,
  };
};
