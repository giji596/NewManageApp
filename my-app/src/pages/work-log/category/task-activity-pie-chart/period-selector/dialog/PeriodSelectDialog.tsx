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
      <Stack direction="row" px={3} py={1.5} spacing={2} alignItems="center">
        <Stack>
          <Typography variant="caption">開始期間</Typography>
          <PeriodSelectMenuButton
            year={2025}
            month={4}
            day={4}
            onChangeYear={() => {}}
            onChangeMonth={() => {}}
            onChangeDay={() => {}}
          />
        </Stack>
        <Typography variant="h6">〜</Typography>
        <Stack>
          <Typography variant="caption">終了期間</Typography>
          <PeriodSelectMenuButton
            year={2025}
            month={4}
            day={4}
            onChangeYear={() => {}}
            onChangeMonth={() => {}}
            onChangeDay={() => {}}
          />
        </Stack>
      </Stack>
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button>選択</Button>
      </DialogActions>
    </Dialog>
  );
}
