import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo } from "react";
import { ConfirmDeleteIncludeMemosDialogLogic } from "./ConfirmDeleteIncludeMemosDialogLogic";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 削除ハンドラー */
  onDelete: () => Promise<void>;
  /** メモタイトル一覧 */
  memoTitles: string[];
};

const ConfirmDeleteIncludeMemosDialog = memo(
  function ConfirmDeleteIncludeMemosDialog({
    open,
    onClose,
    onDelete,
    memoTitles,
  }: Props) {
    const { onClickDelete } = ConfirmDeleteIncludeMemosDialogLogic({
      onClose,
      onDelete,
    });
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <WarningAmberIcon color="warning" sx={{ pr: 1 }} />
          ログに関連したメモが存在します
        </DialogTitle>
        <DialogContent>
          ログを削除すると以下のメモも削除されます
          <ul>
            {memoTitles.map((title, idx) => (
              <li key={idx}>{title}</li>
            ))}
          </ul>
          本当に削除しますか?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button
            onClick={onClickDelete}
            color="error"
            startIcon={<DeleteIcon />}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
export default ConfirmDeleteIncludeMemosDialog;
