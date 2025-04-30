import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";
import { getDaysInMonth } from "date-fns";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** 選択中の年 */
  year: number;
  /** 選択中の月 */
  month: number;
  /** 選択中の日 */
  day: number;
};

/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネントのロジック
 */
export const DateSelectMenuButtonLogic = ({ year, month, day }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const yearSelectList = useMemo(() => {
    const todayYear = getTodayYear();
    return Array.from({ length: 10 }, (_, i) => todayYear - i);
  }, []);
  const monthSelectList = useMemo(() => {
    const todayYear = getTodayYear();
    // 選択年が今年の場合は1~今月まで
    if (year === todayYear) {
      const todayMonth = getTodayMonth();
      return Array.from({ length: todayMonth }, (_, i) => i + 1);
    }
    // それ以外は1~12
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, [year]);
  const daySelectList = useMemo(() => {
    const todayYear = getTodayYear();
    // 年月が今日の値であれば今日の日付まで
    if (year === todayYear) {
      const todayMonth = getTodayMonth();
      if (month === todayMonth) {
        const todayDay = getTodayDay();
        return Array.from({ length: todayDay }, (_, i) => i + 1);
      }
    }
    // それ以外なら現在の年月の日数分
    const days = getDaysInMonth(new Date(year, month - 1));
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [month, year]);

  const getLabel = useCallback((v: number) => {
    const label = String(v);
    // 一桁なら0を付与する
    return label.length === 1 ? `0${label}` : label;
  }, []);

  const dateLabel = useMemo(() => {
    const yearString = getLabel(year);
    const monthString = getLabel(month);
    const dayString = getLabel(day);
    return `${yearString}/${monthString}/${dayString}`;
  }, [getLabel, day, month, year]);

  return {
    /** メニューの開閉状態 */
    open,
    /** メニューの開閉位置 */
    anchorEl,
    /** ボタンクリックした際のハンドラー(メニュー開く) */
    handleClick,
    /** メニュー閉じるハンドラー */
    handleClose,
    /** 年の選択賜 */
    yearSelectList,
    /** 月の選択賜 */
    monthSelectList,
    /** 日の選択賜 */
    daySelectList,
    /** セレクトのラベル取得する(一桁の場合のみ0を頭につける) */
    getLabel,
    /** ボタン用の日付ラベル */
    dateLabel,
  };
};
