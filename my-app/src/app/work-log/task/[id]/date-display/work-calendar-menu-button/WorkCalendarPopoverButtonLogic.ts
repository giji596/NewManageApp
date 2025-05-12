import { useState } from "react";

/**
 * 稼働カレンダーを含むポップを表示するボタンのロジック
 */
export const WorkCalendarPopoverButtonLogic = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "work-calendar-popover" : undefined;

  return {
    /** ポップの展開位置 */
    anchorEl,
    /** ポップ開くハンドラー */
    handleOpen,
    /** ポップ閉じるハンドラー */
    handleClose,
    /** 開閉状態 */
    open,
    /** ポップのid */
    id,
  };
};
