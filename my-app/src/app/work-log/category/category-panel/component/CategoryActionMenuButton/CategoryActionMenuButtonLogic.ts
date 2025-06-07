import { useState } from "react";

/**
 * カテゴリヘッダーのアクションを格納したメニューと開閉ボタンのコンポーネントのロジック
 */
export const CategoryActionMenuButtonLogic = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    /** メニューの開閉位置 */
    anchorEl,
    /** メニュー開閉状態 */
    open,
    /** メニュー開くハンドラー */
    handleOpen,
    /** メニュー閉じるハンドラー */
    handleClose,
  };
};
