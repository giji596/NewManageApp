"use client";
import { MemoDailyTask } from "@/type/Memo";
import { TableRow, TableCell, Collapse, Box, IconButton } from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import useDialog from "@/hook/useDialog";
import MemoDetailDialog from "../dialog/MemoDetailDialog";

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
export default function CustomTableBody({
  memoItem,
  isActive,
  onClickRow,
}: Props) {
  const { open, onClose, onOpen } = useDialog();
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
        <TableCell>
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // rowのイベント(文章の頭を展開する)を行わせない
              onOpen();
            }}
          >
            <AspectRatioIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={isActive} timeout="auto" unmountOnExit>
            <Box margin={1}>{memoItem.summary}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <MemoDetailDialog
        id={memoItem.id}
        title={memoItem.title}
        taskName={memoItem.task.name}
        open={open}
        onClose={onClose}
      />
    </>
  );
}
