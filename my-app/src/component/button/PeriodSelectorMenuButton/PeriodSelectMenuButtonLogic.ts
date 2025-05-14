import { getDate, getDaysInMonth, getMonth, getYear } from "date-fns";
import { useMemo, useState } from "react";

type Props = {
  /** 年 */
  year: number;
  /** 月 */
  month: number;
  /** 日 */
  day: number;
};

/**
 * 期間選択のメニューボタンのロジック
 */
export default function PeriodSelectMenuButtonLogic({
  year,
  month,
  day,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonText = useMemo(() => {
    const yearText = String(year);
    const monthText =
      String(month).length === 1 ? "0" + String(month) : String(month);
    const dayText = String(day).length === 1 ? "0" + String(day) : String(day);
    return `${yearText}/${monthText}/${dayText}`;
  }, [day, month, year]);

  const today = new Date();
  const todayYear = getYear(today);
  const todayMonth = getMonth(today) + 1;
  const todayDay = getDate(today);

  const yearSelect = useMemo(
    () => Array.from({ length: 10 }, (_, i) => todayYear - i),
    [todayYear]
  );
  const monthSelect = useMemo(() => {
    if (year === todayYear) {
      // 今年なら今月まで
      return Array.from({ length: todayMonth }, (_, i) => i + 1);
    } else {
      // 今年以外なら1~12月
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
  }, [todayMonth, todayYear, year]);
  const daySelect = useMemo(() => {
    // 今年の現在の月である場合は今日の日付まで
    if (year === todayYear && month === todayMonth) {
      return Array.from({ length: todayDay }, (_, i) => i + 1);
    } else {
      // それ以外なら選択中の年月の日数分
      const dayCount = getDaysInMonth(new Date(year, month - 1));
      return Array.from({ length: dayCount }, (_, i) => i + 1);
    }
  }, [month, todayDay, todayMonth, todayYear, year]);

  return {
    /** メニューの開く位置 */
    anchorEl,
    /** 開閉状態 */
    open,
    /** 開くハンドラー */
    handleOpen,
    /** 閉じるハンドラー */
    handleClose,
    /** ボタンの表示テキスト */
    buttonText,
    /** 年の選択賜 */
    yearSelect,
    /** 月の選択賜 */
    monthSelect,
    /** 日の選択賜 */
    daySelect,
  };
}
