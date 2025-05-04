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

/**
 * タグを作成するダイアログ
 */
const CreateTagDialog = memo(function CreateTagDialog() {
  return (
    <Dialog open={true /** TODO:あとで */} fullWidth>
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
        <Button color="error">キャンセル</Button>
        <Button>作成</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CreateTagDialog;
