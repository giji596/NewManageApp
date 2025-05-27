"use client";
import { ButtonBase, TableSortLabel } from "@mui/material";
import HeaderDesign from "../useHeaderLabelDesign";
import { memo } from "react";

type Props = {
  /** タイトル */
  title: string;
  /** 選択状態かどうか */
  isSelected: boolean;
  /** 昇順かどうか */
  isAsc: boolean;
  /** タイトルをクリックした際のハンドラー */
  onClickTitle: (title: string) => void;
};
/**
 * ソート可能なテーブル用のヘッダーラベル
 */
const CustomHeaderSortLabel = memo(function CustomHeaderSortLabel({
  title,
  isSelected,
  isAsc,
  onClickTitle,
}: Props) {
  const { customDesign } = HeaderDesign({ isSelected });
  return (
    <ButtonBase onClick={() => onClickTitle(title)} sx={customDesign}>
      <TableSortLabel
        active={isSelected}
        direction={isSelected && !isAsc ? "desc" : "asc"}
      >
        {title}
      </TableSortLabel>
    </ButtonBase>
  );
});
export default CustomHeaderSortLabel;
