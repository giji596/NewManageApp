import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";

/**
 * カテゴリページのタスク一覧のテーブルヘッダー
 */
const CategoryTaskTableHeader = memo(function CategoryTaskTableHeader() {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell>お気に入り</TableCell>
      {/** タスク名 */}
      <TableCell>タスク名</TableCell>
      {/** 進捗 */}
      <TableCell>進捗</TableCell>
      {/** (移動ボタン用の空枠) */}
      <TableCell></TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableHeader;
