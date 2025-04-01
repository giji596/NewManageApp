import { getDate, getDaysInMonth, getMonth, getYear, subDays } from "date-fns";

/** 今年 */
export const currentYear = getYear(new Date());

/** 今月 */
export const currentMonth = getMonth(new Date()) + 1;

/** 今日 */
export const currentDate = getDate(new Date()); // 例: 31
/** 昨日 */
export const yesterday = getDate(subDays(new Date(), 1)); // 例: 31

/** 年の選択肢の配列(2015年~今の年)を取得する関数 */
export const getYearSelectArray = () => {
  const startYear = 2015;
  const length = currentYear - startYear + 1; // 開始年を含むので、長さは+1
  return Array.from({ length: length }, (_, i) => currentYear - i);
};
/** 月の選択賜の配列を取得する関数 */
export const getMonthSelectArray = (year: number) => {
  // 今年なら今の月まで
  if (currentYear == year) {
    return Array.from({ length: currentMonth }, (_, i) => i + 1);
  } else {
    // 過去なら12月まで全部
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
};

/** 日の選択賜の配列を取得する関数 */
export const getDaySelectArray = (year: number, month: number) => {
  // 今の年月の場合は今日までの日付
  if (year === currentYear && month === currentMonth) {
    return Array.from({ length: currentDate }, (_, i) => i + 1);
  } else {
    // それ以外ならその年月の日の分配列
    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
};
