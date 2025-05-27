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
  /** 完了する対象名(タスク,カテゴリ) */
  target: string;
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
  // メモ化不要(マウント後、アンマウントまで再レンダーされないので)
  target,
  open,
  onClose,
  onAccept,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {target}を完了してもよろしいですか？
          <br />
          <Typography color="error" variant="caption">
            * 一度完了すると、稼働状態に戻すことはできません
            <br />* 完了済みの{target}は、新規の稼働に設定できなくなります。
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
