import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { memo } from "react";

/**
 * データリセット時に表示するダイアログ
 */
const DataResetDialog = memo(function DataResetDialog() {
  return (
    <Dialog open={true /** TODO:あとで */}>
      <DialogContent>
        <DialogContentText>
          ローカル保存されたデータを削除しますか？
        </DialogContentText>
        <Typography>
          -この操作は、ブラウザに保存されているデータ（IndexedDB）を初期化します。
        </Typography>
        <Typography>※ インポートしたファイル自体には影響しません。</Typography>
      </DialogContent>
      <DialogActions>
        <Button>キャンセル</Button>
        <Button>リセット</Button>
      </DialogActions>
    </Dialog>
  );
});
export default DataResetDialog;
