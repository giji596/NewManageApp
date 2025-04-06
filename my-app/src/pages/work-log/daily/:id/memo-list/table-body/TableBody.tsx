import { MemoDailyTask } from "@/type/Memo";
import { TableRow, TableCell, Collapse, Box } from "@mui/material";

type Props = {
  /** メモ */
  memoItem: MemoDailyTask;
  /** アクティブ状態(アクティブであれば詳細を表示可能) */
  isActive: boolean;
  /** クリックされた時のハンドラ */
  onClickRow: (id: number) => void;
};

/**
 * 日次詳細 - メモリストのテーブルボディコンポーネント
 */
export default function TableBody({ memoItem, isActive, onClickRow }: Props) {
  return (
    <>
      <TableRow
        hover
        selected={isActive}
        onClick={() => onClickRow(memoItem.id)}
        sx={{ "& > *": { borderBottom: "unset" } }} // 内部の子全てにボーダーを消すスタイルを適応
      >
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {memoItem.title}
        </TableCell>
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {memoItem.task.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={isActive} timeout="auto" unmountOnExit>
            <Box margin={1}>{memoItem.summary}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
