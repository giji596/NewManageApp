import { TableRow, TableCell, CircularProgress } from "@mui/material";
import { memo } from "react";

type Props = {
  /** 行数 */
  colCount: number;
};

/**
 * ロード中に表示するテーブルボディコンポーネント
 */
const TableBodyLoading = memo(function TableBodyLoading({ colCount }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colCount} sx={{ height: "200px" }} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
});
export default TableBodyLoading;
