import { useState } from "react";

/**
 * 期間選択のメニューボタンのロジック
 */
export default function PeriodSelectMenuButtonLogic() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    /** メニューの開く位置 */
    anchorEl,
    /** 開閉状態 */
    open,
    /** 開くハンドラー */
    handleOpen,
    /** 閉じるハンドラー */
    handleClose,
  };
}
