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
  Typography,
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
      <Stack direction="row" px={3} py={1.5} spacing={1} alignItems="center">
        <FormControl fullWidth>
          <InputLabel>開始期間</InputLabel>
          <Select variant="standard" label="開始期間">
            <MenuItem>開始期間</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h5">〜</Typography>
        <FormControl fullWidth>
          <InputLabel>終了期間</InputLabel>
          <Select variant="standard" label="終了期間">
            <MenuItem>終了期間</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button>選択</Button>
      </DialogActions>
    </Dialog>
  );
}
