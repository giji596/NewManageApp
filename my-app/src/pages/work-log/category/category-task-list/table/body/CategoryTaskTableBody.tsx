import { IconButton, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

type Props = {
  /** タスク名 */
  taskName: string;
  /** 進捗率 */
  progress: number;
};

/**
 * カテゴリページのタスク一覧のテーブルボディ
 */
const CategoryTaskTableBody = memo(function CategoryTaskTableBody({
  taskName,
  progress,
}: Props) {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell>
        <StarBorderIcon />
      </TableCell>
      {/** タスク名 */}
      <TableCell>{taskName}</TableCell>
      {/** 進捗 */}
      <TableCell>{progress}%</TableCell>
      {/** 詳細へ移動するボタン */}
      <TableCell>
        <IconButton>
          <DoubleArrowIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableBody;
