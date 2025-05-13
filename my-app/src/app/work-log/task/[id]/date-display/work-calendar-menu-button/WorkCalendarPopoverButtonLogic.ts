import { useState } from "react";

type Props = {
  /** 開始日(yyyy/MM/dd) */
  firstActivityDate: string | null;
  /** 最終実施日(yyyy/MM/dd) 実施記録がない場合はnull */
  lastActivityDate: string | null;
};

/**
 * 稼働カレンダーを含むポップを表示するボタンのロジック
 */
export const WorkCalendarPopoverButtonLogic = ({
  firstActivityDate,
  lastActivityDate,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "work-calendar-popover" : undefined;

  const noActivity = lastActivityDate === null || firstActivityDate === null;

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
    /** 実施記録の有無 */
    noActivity,
  };
};
