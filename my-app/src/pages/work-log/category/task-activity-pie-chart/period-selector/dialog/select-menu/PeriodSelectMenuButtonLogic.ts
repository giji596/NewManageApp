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
  };
}
