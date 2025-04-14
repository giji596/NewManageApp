import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import PeriodSelectMenuButton from "./select-menu/PeriodSelectMenuButton";

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
        <PeriodSelectMenuButton
          year={2025}
          month={4}
          day={4}
          onChangeYear={() => {}}
          onChangeMonth={() => {}}
          onChangeDay={() => {}}
        />
        <Typography variant="h5">〜</Typography>
        <PeriodSelectMenuButton
          year={2025}
          month={4}
          day={4}
          onChangeYear={() => {}}
          onChangeMonth={() => {}}
          onChangeDay={() => {}}
        />
      </Stack>
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button>選択</Button>
      </DialogActions>
    </Dialog>
  );
}
