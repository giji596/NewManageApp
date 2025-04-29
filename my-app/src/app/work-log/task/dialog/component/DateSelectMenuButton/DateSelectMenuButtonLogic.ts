import { getDaysInMonth } from "date-fns";
import { useMemo, useState } from "react";

type Props = {
  /** 選択中の年 */
  selectYear: number;
  /** 選択中の月 */
  selectMonth: number;
  /** 選択中の日 */
  selectDay: number;
};

/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネントのロジック
 */
export const DateSelectMenuButtonLogic = ({
  selectYear,
  selectMonth,
  selectDay,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const yearSelectList = useMemo(() => {
    const todayYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => todayYear - i);
  }, []);
  const monthSelectList = useMemo(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    // 選択年が今年の場合は1~今月まで
    if (selectYear === todayYear) {
      const todayMonth = today.getMonth() + 1;
      return Array.from({ length: todayMonth }, (_, i) => i + 1);
    }
    // それ以外は1~12
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, [selectYear]);
  const daySelectList = useMemo(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    // 年月が今日の値であれば今日の日付まで
    if (selectYear === todayYear) {
      const todayMonth = today.getMonth() + 1;
      if (selectMonth === todayMonth) {
        const todayDay = today.getDate();
        return Array.from({ length: todayDay }, (_, i) => i + 1);
      }
    }
    // それ以外なら現在の年月の日数分
    const days = getDaysInMonth(new Date(selectYear, selectMonth));
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [selectMonth, selectYear]);

  const yearLabel = useMemo(() => String(selectYear), [selectYear]);
  const monthLabel = useMemo(() => {
    const label = String(selectMonth);
    // 一桁なら0を付与する
    return label.length === 1 ? `0${label}` : label;
  }, [selectMonth]);
  const dayLabel = useMemo(() => {
    const label = String(selectDay);
    // 一桁なら0を付与する
    return label.length === 1 ? `0${label}` : label;
  }, [selectDay]);

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
    /** 年のラベル */
    yearLabel,
    /** 月のラベル */
    monthLabel,
    /** 日のラベル */
    dayLabel,
  };
};
