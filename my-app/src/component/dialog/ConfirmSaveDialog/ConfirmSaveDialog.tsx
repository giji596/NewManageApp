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
 * 保存の確認用のダイアログ
 */
export default function ConfirmSaveDialog({ open, onClose, onAccept }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>保存してもよろしいですか？</DialogContentText>
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
