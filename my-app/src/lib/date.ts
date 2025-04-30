import { lastDayOfMonth } from "date-fns";

// 日付取得(引数なし)
/** 今の年を取得する */
export const getTodayYear = () => new Date().getFullYear();
/** 今の月を取得する */
export const getTodayMonth = () => new Date().getMonth() + 1;
/** 今の日を取得する */
export const getTodayDay = () => new Date().getDate();

// 日付チェック関数
/** 今年かどうか調べる関数 */
export const isTodayYear = (year: number) => getTodayYear() === year;
/** 今月かどうか調べる関数 */
export const isTodayMonth = (month: number) => getTodayMonth() === month;
/** 今の日かどうか調べる関数 */
export const isTodayDay = (day: number) => getTodayDay() === day;
/** 今月より後か調べる関数 */
export const isOverTodayMonth = (month: number) => getTodayMonth() < month;
/** 今の日より後か調べる関数 */
export const isOverTodayDay = (day: number) => getTodayDay() < day;

// 特定の値を取得(引数あり)
export const getLastDay = (year: number, month: number) => {
  const lastDate = lastDayOfMonth(new Date(year, month - 1));
  return lastDate.getDate();
};
