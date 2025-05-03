"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

type Props = {
  /** 開閉状態 */
  open: boolean;
  /** 閉じるハンドラー */
  onClose: () => void;
  /** okな時のハンドラー  */
  onAccept: () => void;
};

/**
 * タスク詳細　タスクを完了状態にするか確認するためのダイアログ
 */
export default function CompleteConfirmDialog({
  open,
  onClose,
  onAccept,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          タスクを完了してもよろしいですか？
          <br />
          <Typography color="error" variant="caption">
            * 一度完了すると、稼働状態に戻すことはできません
            <br />* 完了済みのタスクは、稼働タスクに設定できなくなります。
          </Typography>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            はい
          </Button>
          <Button color="error" onClick={onClose}>
            いいえ
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
