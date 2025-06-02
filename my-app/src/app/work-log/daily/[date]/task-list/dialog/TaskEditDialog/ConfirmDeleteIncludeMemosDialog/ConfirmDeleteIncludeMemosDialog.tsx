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
    const memoTitles = ["メモ1", "メモ2", "メモ3"];
    return (
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>ログに関連したメモが存在します</DialogTitle>
        <DialogContent>
          ログを削除すると以下のメモも削除されます
          <ul>
            {memoTitles.map((title, idx) => (
              <li key={idx}>{title}</li>
            ))}
          </ul>
          本当に削除しますか?
        </DialogContent>
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
