import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
        <TextField />
      </DialogContent>
      <DialogActions>
        <Button>キャンセル</Button>
        <Button>作成</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CreateTagDialog;
