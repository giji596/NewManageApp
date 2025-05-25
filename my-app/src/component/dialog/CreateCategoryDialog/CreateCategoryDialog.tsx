"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateCategoryDialogLogic from "./CreateCategoryDialogLogic";
import { Controller } from "react-hook-form";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
  /** カテゴリ作成時のロジック(親で処理が必要な場合のみ) */
  onCreateCategory?: (newTaskId: number) => void;
};

/**
 * 新規カテゴリを作成するダイアログ
 */
export default function CreateCategoryDialog({
  open,
  onClose,
  onCreateCategory,
}: Props) {
  const { control, isValid, duplicateError, onSubmit } =
    CreateCategoryDialogLogic({ onClose, onCreateCategory });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {/** タイトル */}
      <DialogTitle>新規カテゴリを作成</DialogTitle>
      <form onSubmit={onSubmit}>
        {/** コンテンツ */}
        <DialogContent>
          {/** カテゴリフォーム */}
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} fullWidth label="カテゴリ名" />
            )}
          />
          {/** エラーメッセージ */}
          {duplicateError && (
            <Typography variant="caption" color="error">
              * 同名のカテゴリがすでに存在します
            </Typography>
          )}
        </DialogContent>
        {/** ロウワー ボタン */}
        <DialogActions>
          <Button
            disabled={!isValid}
            type="submit"
            variant="contained"
            startIcon={<AddBoxIcon />}
          >
            作成
          </Button>
          <Button onClick={onClose} color="error">
            キャンセル
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
