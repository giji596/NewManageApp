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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/**
 * カテゴリ名を編集するダイアログ
 */
const CategoryNameEditDialog = memo(function CategoryNameEditDialog() {
  return (
    <Dialog open={true /** TODO: */} fullWidth>
      <DialogTitle>カテゴリ名を編集</DialogTitle>
      <Stack py={0.5} px={6} spacing={1}>
        <Typography>変更前の名称:{/** TODO: */}</Typography>
        <TextField id="category-name" label="変更後の名称" />
      </Stack>
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button startIcon={<CheckCircleIcon />}>保存</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CategoryNameEditDialog;
