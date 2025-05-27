import { TableRow, TableCell } from "@mui/material";
import { memo } from "react";

type Props = {
  /** 行数 */
  colCount: number;
};

/**
 * アイテムがない時のテーブルボディコンポーネント
 */
const TableBodyNoItem = memo(function TableBodyNoItem({ colCount }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colCount} align="center" sx={{ height: "200px" }}>
        データがありません
      </TableCell>
    </TableRow>
  );
});
export default TableBodyNoItem;
