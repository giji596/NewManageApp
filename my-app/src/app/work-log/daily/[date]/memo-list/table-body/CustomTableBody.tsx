"use client";
import { MemoDailyTask } from "@/type/Memo";
import { TableRow, TableCell, Collapse, Box, IconButton } from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import useDialog from "@/hook/useDialog";
import MemoEditDialog from "@/component/dialog/memo-edit-dialog/MemoEditDialog";
import { CustomTableBodyLogic } from "./CustomTableBodyLogic";

type Props = {
  /** メモ */
  memoItem: MemoDailyTask;
  /** アクティブ状態(アクティブであれば詳細を表示可能) */
  isActive: boolean;
  /** ハイライトされてるか(選択中のタスクのメモであるか) */
  isHighlighted: boolean;
  /** クリックされた時のハンドラ */
  onClickRow: (id: number) => void;
};

/**
 * 日次詳細 - メモリストのテーブルボディコンポーネント
 */
export default function CustomTableBody({
  memoItem,
  isActive,
  isHighlighted,
  onClickRow,
}: Props) {
  const { open, onClose, onOpen } = useDialog();
  const { backgroundColor } = CustomTableBodyLogic({ isHighlighted });
  return (
    <>
      <TableRow
        hover
        selected={isActive}
        onClick={() => onClickRow(memoItem.id)}
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: backgroundColor,
        }} // 内部の子全てにボーダーを消すスタイルを適応
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
        {/** タグ名 */}
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {memoItem.tagName}
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={isActive} timeout="auto" unmountOnExit>
            <Box margin={1}>{memoItem.summary}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {open && (
        <MemoEditDialog
          id={memoItem.id}
          title={memoItem.title}
          tagName={memoItem.tagName}
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
}
