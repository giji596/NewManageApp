import { IconButton, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  /** お気に入りかどうか */
  isFavorite: boolean;
  /** タスク名 */
  taskName: string;
  /** 進捗率 */
  progress: number;
  /** タスクのid(移動用) */
  taskId: number;
  /** 移動ボタンを押した際のハンドラー */
  onClickNavigate: (id: number) => void;
};

/**
 * カテゴリページのタスク一覧のテーブルボディ
 */
const CategoryTaskTableBody = memo(function CategoryTaskTableBody({
  isFavorite,
  taskName,
  progress,
  taskId,
  onClickNavigate,
}: Props) {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell>
        {!isFavorite && <StarBorderIcon />}
        {isFavorite && <StarIcon color="primary" />}
      </TableCell>
      {/** タスク名 */}
      <TableCell>{taskName}</TableCell>
      {/** 進捗 */}
      <TableCell>{progress}%</TableCell>
      {/** 詳細へ移動するボタン */}
      <TableCell>
        <IconButton onClick={() => onClickNavigate(taskId)}>
          <DoubleArrowIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableBody;
