"use client";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import StarIcon from "@mui/icons-material/Star";
import { CategoryTaskList } from "@/type/Task";

type Props = {
  /** タスクアイテム */
  item: CategoryTaskList;
  /** 移動ボタンを押した際のハンドラー */
  onClickNavigate: (id: number) => void;
};

/**
 * カテゴリページのタスク一覧のテーブルボディ
 */
const CategoryTaskTableBody = memo(function CategoryTaskTableBody({
  item,
  onClickNavigate,
}: Props) {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell sx={{ pl: 3 }}>
        {!item.isFavorite && <StarBorderIcon />}
        {item.isFavorite && <StarIcon color="primary" />}
      </TableCell>
      {/** タスク名 */}
      <TableCell
        sx={{
          pl: 3,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.name}
      </TableCell>
      {/** 進捗 */}
      <TableCell sx={{ pl: 3 }}>{item.progress}%</TableCell>
      {/** 詳細へ移動するボタン */}
      <TableCell>
        <IconButton onClick={() => onClickNavigate(item.id)}>
          <DoubleArrowIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableBody;
