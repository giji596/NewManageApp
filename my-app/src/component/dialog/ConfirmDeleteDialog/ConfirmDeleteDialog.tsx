"use client";
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
  /** 閉じる関数 */
  onClose: () => void;
  /** okな時のハンドラー  */
  onAccept: () => void;
};

/**
 * 削除の確認用のダイアログ
 */
export default function ConfirmDeleteDialog({
  // メモ化不要(マウント後、アンマウントまで再レンダーされないので)
  open,
  onClose,
  onAccept,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>削除してもよろしいですか？</DialogContentText>
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
