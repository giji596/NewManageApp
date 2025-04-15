import { IconButton, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

/**
 * カテゴリページのタスク一覧のテーブルボディ
 */
const CategoryTaskTableBody = memo(function CategoryTaskTableBody() {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell>
        <StarBorderIcon />
      </TableCell>
      {/** タスク名 */}
      <TableCell>タスク名</TableCell>
      {/** 進捗 */}
      <TableCell>進捗%</TableCell>
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
