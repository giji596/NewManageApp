import { TableRow, TableCell } from "@mui/material";

type Props = {
  /** 行数 */
  colCount: number;
};

/**
 * アイテムがない時のテーブルボディコンポーネント
 */
export default function TableBodyNoItem({ colCount }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colCount} align="center" sx={{ height: "200px" }}>
        データがありません
      </TableCell>
    </TableRow>
  );
}
