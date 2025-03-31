import { useState } from "react";

/**
 * 日付ページヘッダーで使用するメソッド
 */
export default function DailyHeaderLogic() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // ポップオーバーの位置
  const open = Boolean(anchorEl);

  const monthArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return {
    /** 月のstring配列(1~12) */
    monthArray,
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
