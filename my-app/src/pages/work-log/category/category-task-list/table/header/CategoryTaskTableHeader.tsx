import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";

/**
 * カテゴリページのタスク一覧のテーブルヘッダー
 */
const CategoryTaskTableHeader = memo(function CategoryTaskTableHeader() {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell sx={{ width: "10%" }}>お気に入り</TableCell>
      {/** タスク名 */}
      <TableCell sx={{ width: "60%" }}>タスク名</TableCell>
      {/** 進捗 */}
      <TableCell sx={{ width: "20%" }}>進捗</TableCell>
      {/** (移動ボタン用の空枠) */}
      <TableCell sx={{ width: "10%" }}></TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableHeader;
