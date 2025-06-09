import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";

/**
 * カテゴリ名を編集するダイアログ
 */
const CategoryNameEditDialog = memo(function CategoryNameEditDialog() {
  return (
    <Dialog open={true /** TODO: */} fullWidth>
      <DialogTitle>カテゴリ名を編集</DialogTitle>
      <Stack>
        <Typography>変更前の名称:{/** TODO: */}</Typography>
        <TextField />
      </Stack>
      <DialogActions>
        <Button>キャンセル</Button>
        <Button>保存</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CategoryNameEditDialog;
