"use client";
import { ButtonBase, TableSortLabel } from "@mui/material";
import HeaderDesign from "../useHeaderLabelDesign";

type Props = {
  /** タイトル */
  title: string;
  /** 選択状態かどうか */
  isSelected: boolean;
  /** 昇順かどうか */
  isAsc: boolean;
  /** 対象についての参照id */
  refId: number;
  /** タイトルをクリックした際のハンドラー */
  onClickTitle: (title: string) => void;
  /** タイトルをホバーした際のハンドラー */
  onHoverTitle: (refId: number, e: React.MouseEvent<HTMLElement>) => void;
  /** タイトルからリーブした際のハンドラー */
  onLeaveTitle: (refId: number) => void;
};

/**
 * ソート可能なホバー時にチェックボックスを表示させるヘッダーラベル
 */
export default function CustomHeaderSortCheckLabel({
  title,
  isSelected,
  isAsc,
  refId,
  onClickTitle,
  onHoverTitle,
  onLeaveTitle,
}: Props) {
  const { customDesign } = HeaderDesign({ isSelected });
  return (
    <ButtonBase
      onClick={() => onClickTitle(title)}
      onMouseEnter={(e) => onHoverTitle(refId, e)}
      onMouseLeave={() => onLeaveTitle(refId)}
      sx={customDesign}
    >
      <TableSortLabel
        active={isSelected}
        direction={isSelected && !isAsc ? "desc" : "asc"}
      >
        {title}
      </TableSortLabel>
    </ButtonBase>
  );
}
