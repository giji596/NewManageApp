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
} from "@mui/material";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};

/**
 * タスク詳細ページでタスクを編集するダイアログ
 */
export default function TaskEditDialog({ open, onClose }: Props) {
  const isLoading = false; // TODO:ロジック作成時に移動(カテゴリ一覧のフェッチのロード状態)
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {/** タイトル */}
      <DialogTitle>タスクを編集</DialogTitle>
      <Stack py={2} px={3.5} spacing={2}>
        {/** タスク名 */}
        <TextField
          label={"タスク名"}
          variant="standard"
          sx={{ "& input": { pl: 1.5 } }}
          slotProps={{ inputLabel: { sx: { pl: 3 } } }}
        />
        {/** カテゴリ */}
        {isLoading && (
          <Stack width="32px" height="32px" pl={2}>
            <CircularProgress size="small" />
          </Stack>
        )}
        {!isLoading && (
          <FormControl fullWidth>
            <InputLabel>カテゴリ名</InputLabel>
            <Select
              label="カテゴリ名"
              variant="standard"
              defaultValue={1}
              sx={{ pl: 1.5 }}
            >
              {[1, 2, 3].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {/** お気に入り */}
        <FormControlLabel control={<Checkbox />} label="お気に入り" />
      </Stack>
      {/** ボタン */}
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button>保存</Button>
      </DialogActions>
    </Dialog>
  );
}
