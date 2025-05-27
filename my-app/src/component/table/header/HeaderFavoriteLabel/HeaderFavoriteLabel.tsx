"use client";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox } from "@mui/material";
import { memo } from "react";

type Props = {
  /** チェック状態 */
  isChecked: boolean;
  /** クリック時のハンドラー */
  onClick: () => void;
};

/**
 * お気に入り用のチェックボックスラベル
 */
const HeaderFavoriteLabel = memo(function HeaderFavoriteLabel({
  isChecked,
  onClick,
}: Props) {
  return (
    <Checkbox
      id="favorite-check"
      checked={isChecked}
      onClick={onClick}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
    />
  );
});
export default HeaderFavoriteLabel;
