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
import { CreateTagDialogLogic } from "./CreateTagDialogLogic";
import { Controller } from "react-hook-form";

type Props = {
  /** 開閉状態 */
  open: boolean;
  /** 閉じるハンドラー */
  onClose: () => void;
  /** タグ作成後に呼び出しする関数(親で必要な場合のみ) */
  onCreateTag?: (newId: number) => void;
};
/**
 * タグを作成するダイアログ
 */
const CreateTagDialog = memo(function CreateTagDialog({
  open,
  onClose,
  onCreateTag,
}: Props) {
  const { control, isSendable, onSubmit, duplicateError } =
    CreateTagDialogLogic({ onClose, onCreateTag });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>新規タグを作成</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="tagName"
            render={({ field }) => (
              <TextField
                {...field}
                label="タグ名"
                variant="standard"
                slotProps={{
                  input: {
                    "aria-describedby": duplicateError
                      ? "duplicate-error"
                      : undefined,
                  },
                }}
              />
            )}
          />
          {duplicateError && (
            <Typography id="duplicate-error" variant="caption" color="error">
              * 同名のタグがすでに存在します
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit" disabled={!isSendable}>
            作成
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
export default CreateTagDialog;
