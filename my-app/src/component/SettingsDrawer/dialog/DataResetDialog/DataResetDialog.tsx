import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { memo } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataResetDialogLogic } from "./DataResetDialogLogic";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};

/**
 * データリセット時に表示するダイアログ
 */
const DataResetDialog = memo(function DataResetDialog({
  open,
  onClose,
}: Props) {
  const { onClickDelete } = DataResetDialogLogic({ onClose });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          ローカル保存されたデータを削除しますか？
        </DialogContentText>
        <Typography color="textSecondary" pt={3} pl={1}>
          -この操作は、ブラウザに保存されているデータ（IndexedDB）を初期化します。
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" pt={2} pl={1}>
          ※ インポートしたファイル自体には影響しません。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          color="error"
          startIcon={<DeleteForeverIcon />}
          onClick={onClickDelete}
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default DataResetDialog;
