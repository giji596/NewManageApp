import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";

/**
 * カテゴリページのタスク一覧のテーブルボディ
 */
const CategoryTaskTableBody = memo(function CategoryTaskTableBody() {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell>まーく</TableCell>
      {/** タスク名 */}
      <TableCell>タスク名</TableCell>
      {/** 進捗 */}
      <TableCell>進捗%</TableCell>
      {/** 詳細へ移動するボタン */}
      <TableCell>ボタン</TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableBody;
