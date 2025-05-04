import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";

type Props = {
  /** 開閉状態 */
  open: boolean;
  /** 閉じるハンドラー */
  onClose: () => void;
};
/**
 * タグを作成するダイアログ
 */
const CreateTagDialog = memo(function CreateTagDialog({
  open,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>新規タグを作成</DialogTitle>
      <DialogContent>
        <TextField
          label="タグ名"
          variant="standard"
          slotProps={{
            input: {
              "aria-describedby": true ? "duplicate-error" : undefined, // TODO:エラーで分岐
            },
          }}
        />
        <Typography id="duplicate-error" variant="caption" color="error">
          *エラーメッセージ
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          キャンセル
        </Button>
        <Button>作成</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CreateTagDialog;
