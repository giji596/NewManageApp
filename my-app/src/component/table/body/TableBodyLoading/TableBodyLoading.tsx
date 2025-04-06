import { TableRow, TableCell, CircularProgress } from "@mui/material";

type Props = {
  /** 行数 */
  colCount: number;
};

/**
 * ロード中に表示するテーブルボディコンポーネント
 */
export default function TableBodyLoading({ colCount }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colCount} sx={{ height: "200px" }} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
}
