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
import { CategoryOption } from "@/type/Category";
import { CategoryNameEditDialogLogic } from "./CategoryNameEditDialogLogic";
import { Controller } from "react-hook-form";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** 閉じるイベント */
  onClose: () => void;
  /** 変更前のカテゴリ */
  category: CategoryOption;
};

/**
 * カテゴリ名を編集するダイアログ
 */
const CategoryNameEditDialog = memo(function CategoryNameEditDialog({
  open,
  onClose,
  category,
}: Props) {
  const { duplicateError, onSubmit, control, isValid } =
    CategoryNameEditDialogLogic({
      onClose,
      category,
    });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>カテゴリ名を編集</DialogTitle>
        <Stack py={0.5} px={6} spacing={1}>
          <Typography>変更前の名称:{category.name}</Typography>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} id="category-name" label="変更後の名称" />
            )}
          />
          <Typography
            color="error"
            variant="caption"
            visibility={duplicateError ? undefined : "hidden"}
          >
            * すでに存在するカテゴリ名と重複しています
          </Typography>
        </Stack>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            startIcon={<CheckCircleIcon />}
            type="submit"
            disabled={!isValid}
          >
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
export default CategoryNameEditDialog;
