import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
