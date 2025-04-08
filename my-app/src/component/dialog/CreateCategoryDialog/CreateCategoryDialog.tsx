import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * 新規カテゴリを作成するダイアログ
 */
export default function CreateCategoryDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {/** タイトル */}
      <DialogTitle>新規カテゴリを作成</DialogTitle>
      <form
        onSubmit={() => {
          /**TODO: */
        }}
      >
        {/** コンテンツ */}
        <DialogContent>
          {/** カテゴリフォーム */}
          <TextField fullWidth label="カテゴリ名" />
        </DialogContent>
        {/** ロウワー ボタン */}
        <DialogActions>
          <Button onClick={onClose} color="error">
            キャンセル
          </Button>
          <Button type="submit" variant="contained" startIcon={<AddBoxIcon />}>
            作成
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
