import { useMemo, useState } from "react";

type Props = {
  /** 表示する年 */
  displayYear: string;
  /** 表示する月 */
  displayMonth: string;
};

/**
 * 日付ページヘッダーで使用するメソッド
 */
export default function DailyHeaderLogic({ displayYear, displayMonth }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // ポップオーバーの位置
  const open = Boolean(anchorEl);

  const yearArray = useMemo(
    () => Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i),
    []
  );

  const monthArray = useMemo(
    () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    []
  );

  const isLastRange = useMemo(
    () =>
      Number(displayYear) === new Date().getFullYear() &&
      Number(displayMonth) === new Date().getMonth() + 1,
    [displayMonth, displayYear]
  );
  const isStartRange = useMemo(
    () => Number(displayYear) === yearArray[9] && Number(displayMonth) === 1,
    [displayMonth, displayYear, yearArray]
  );

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return {
    /** 月のstring配列(1~12) */
    monthArray,
    /** 年のstring配列(今年~10年間) */
    yearArray,
    /** 月選択の範囲の最後(今の月)かどうか */
    isLastRange,
    /** 月選択の範囲の最初(10年前の1月)かどうか */
    isStartRange,
    /** ポップオーバーの位置 */
    anchorEl,
    /** ポップオーバーの開閉状態 */
    open,
    /** ポップオーバーを開くハンドラー */
    handleOpenPopover,
    /** ポップオーバーを閉じるハンドラー */
    handleClosePopover,
  };
}
