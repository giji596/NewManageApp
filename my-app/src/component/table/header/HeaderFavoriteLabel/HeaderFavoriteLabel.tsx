"use client";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox } from "@mui/material";

type Props = {
  /** チェック状態 */
  isChecked: boolean;
  /** クリック時のハンドラー */
  onClick: () => void;
};

/**
 * お気に入り用のチェックボックスラベル
 */
export default function HeaderFavoriteLabel({ isChecked, onClick }: Props) {
  return (
    <Checkbox
      checked={isChecked}
      onClick={onClick}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
    />
  );
}
