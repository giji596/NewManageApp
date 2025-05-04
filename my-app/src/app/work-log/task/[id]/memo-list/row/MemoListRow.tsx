"use client";
import { TableCell, TableRow, Collapse, Box, IconButton } from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { MemoTaskDetail } from "@/type/Memo";
import MemoListRowLogic from "./MemoListRowLogic";
import MemoEditDialog from "../memo-edit-dialog/MemoEditDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** メモ */
  memoItem: MemoTaskDetail;
  /** アクティブ状態(アクティブであれば詳細を表示可能) */
  isActive: boolean;
  /** クリックされた時のハンドラ */
  onClickRow: (id: number) => void;
};
/**
 * タスク詳細ページ 行のコンポーネント
 */
export default function MemoListRow({ memoItem, isActive, onClickRow }: Props) {
  const { dateString } = MemoListRowLogic({ memoItem });
  const { open, onClose, onOpen } = useDialog();
  return (
    <>
      <TableRow
        hover
        selected={isActive}
        onClick={() => onClickRow(memoItem.id)}
        sx={{ "& > *": { borderBottom: "unset" } }} // 内部の子全てにボーダーを消すスタイルを適応
      >
        {/** 日付 */}
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {dateString}
        </TableCell>
        {/** タイトル */}
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {memoItem.title}
        </TableCell>
        {/** タグ */}
        <TableCell
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {memoItem.tag}
        </TableCell>
        {/** 展開ボタン */}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={isActive} timeout="auto" unmountOnExit>
            <Box margin={1}>{memoItem.summary}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/** 詳細のダイアログ */}
      {open && (
        <MemoEditDialog
          id={memoItem.id}
          title={memoItem.title}
          tagName={memoItem.tag}
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
}
