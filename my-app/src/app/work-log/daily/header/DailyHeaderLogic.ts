import { useMemo, useState } from "react";

/**
 * 日付ページヘッダーで使用するメソッド
 */
export default function DailyHeaderLogic() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // ポップオーバーの位置
  const open = Boolean(anchorEl);

  const monthArray = useMemo(
    () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    []
  );

  const yearArray = useMemo(
    () => Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i),
    []
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
