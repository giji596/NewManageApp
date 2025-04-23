"use client";
import {
  Button,
  Checkbox,
  Dialog,
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
import { Controller } from "react-hook-form";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CreateTaskDialogLogic from "./CreateTaskDialogLogic";

type Props = {
  /** カテゴリidの初期値 */
  initialCategoryId: number;
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
};

/**
 * タスクを新規作成するダイアログ
 */
export default function CreateTaskDialog({
  initialCategoryId,
  open,
  onClose,
}: Props) {
  const { categoryList, control, isValid, duplicateError, onSubmit } =
    CreateTaskDialogLogic({
      initialCategoryId,
      onClose,
    });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>新規タスクを作成</DialogTitle>
      <form onSubmit={onSubmit}>
        {/** メインコンテンツ部分(カテゴリとタスク名のフォーム) */}
        <Stack spacing={1} px={2}>
          {/** カテゴリフォーム */}
          <FormControl fullWidth>
            <InputLabel>カテゴリ名</InputLabel>
            {categoryList && (
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="カテゴリ名">
                    {categoryList.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>
          {/** タスク名のフォーム */}
          <Controller
            name="taskName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="タスク名" error={duplicateError} />
            )}
          />
        </Stack>
        {/** まんなか(エラーメッセージ) */}
        {duplicateError && (
          <Typography variant="caption" color="error">
            * すでに同じタスク名が存在します。
          </Typography>
        )}
        {/** ロウワー部分(おきにのチェックとボタン) */}
        <Stack
          spacing={1}
          p={2}
          direction="row"
          justifyContent={"space-between"}
        >
          {/** おきにのチェック */}
          <FormControl>
            <FormControlLabel
              control={
                <Controller
                  name="isFavorite"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              }
              label="お気に入りに設定"
            />
          </FormControl>
          {/** 追加/キャンセルボタン */}
          <Stack direction="row" spacing={2}>
            <Button color="error" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              variant="contained"
              startIcon={<AddTaskIcon />}
              type="submit"
              disabled={!isValid}
            >
              追加
            </Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}
