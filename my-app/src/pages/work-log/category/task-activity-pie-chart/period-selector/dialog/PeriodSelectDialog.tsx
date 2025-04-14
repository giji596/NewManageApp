import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
};

/**
 * 表示期間を選択するダイアログ
 */
export default function PeriodSelectDialog({ open, onClose }: Props) {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>期間を選択</DialogTitle>
      <Stack direction="row">
        <FormControl fullWidth>
          <InputLabel>開始期間</InputLabel>
          <Select label="開始期間">
            <MenuItem>開始期間</MenuItem>
          </Select>
        </FormControl>
        〜
        <FormControl fullWidth>
          <InputLabel>終了期間</InputLabel>
          <Select label="終了期間">
            <MenuItem>終了期間</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <DialogActions>
        <Button>キャンセル</Button>
        <Button>移動</Button>
      </DialogActions>
    </Dialog>
  );
}
