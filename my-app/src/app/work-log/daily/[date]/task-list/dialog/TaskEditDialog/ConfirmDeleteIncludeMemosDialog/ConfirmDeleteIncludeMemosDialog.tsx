import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { memo } from "react";

const ConfirmDeleteIncludeMemosDialog = memo(
  function ConfirmDeleteIncludeMemosDialog() {
    return (
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>メモを含めて削除</DialogTitle>
        <DialogContent>本当に削除しますか?</DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>キャンセル</Button>
          <Button onClick={() => {}} color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
export default ConfirmDeleteIncludeMemosDialog;
