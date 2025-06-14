"use client";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TaskEditDialogLogic from "./TaskEditDialogLogic";
import { Controller } from "react-hook-form";
import { memo } from "react";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
  /** タスク名の初期値 */
  initialTaskName: string;
  /** カテゴリidの初期値 */
  initialCategoryId: number;
  /** お気に入りの初期値 */
  initialIsFavorite: boolean;
};

/**
 * タスク詳細ページでタスクを編集するダイアログ
 */
const TaskEditDialog = memo(function TaskEditDialog({
  open,
  onClose,
  initialTaskName,
  initialCategoryId,
  initialIsFavorite,
}: Props) {
  const {
    categoryList,
    isLoading,
    duplicateError,
    control,
    isValid,
    onSubmit,
  } = TaskEditDialogLogic({
    initialTaskName,
    initialCategoryId,
    initialIsFavorite,
    onClose,
  });
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        {/** タイトル */}
        <DialogTitle>タスクを編集</DialogTitle>
        <Stack py={2} px={3.5} spacing={2}>
          {/** タスク名 */}
          <Controller
            name={"taskName"}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="task-name"
                label={"タスク名"}
                variant="standard"
                sx={{ "& input": { pl: 1.5 } }}
                slotProps={{ inputLabel: { sx: { pl: 3 } } }}
              />
            )}
          />
          {/** カテゴリ */}
          {isLoading && (
            <Stack width="32px" height="32px" pl={2}>
              <CircularProgress size="small" />
            </Stack>
          )}
          {!isLoading && (
            <FormControl fullWidth>
              <InputLabel id="category-select-label">カテゴリ名</InputLabel>
              <Controller
                name={"categoryId"}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="category-select-label"
                    id="category-select"
                    label="カテゴリ名"
                    variant="standard"
                    defaultValue={1}
                    sx={{ pl: 1.5 }}
                  >
                    {categoryList.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          )}
          {/** エラーメッセージ */}
          {duplicateError && (
            <Typography variant="caption" color="error">
              * すでに存在するタスクは追加できません。
            </Typography>
          )}
          {/** お気に入り */}
          <FormControlLabel
            control={
              <Controller
                name={"isFavorite"}
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label="お気に入り"
          />
        </Stack>
        {/** ボタン */}
        <DialogActions>
          <Button color="error" onClick={onClose}>
            キャンセル
          </Button>
          <Button disabled={!isValid} type={"submit"}>
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
export default TaskEditDialog;
