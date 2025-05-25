import {
  Button,
  Dialog,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

/**
 * インポート時の上書きの確認ダイアログ
 */
const ImportOverwriteDialog = memo(function ImportOverwriteDialog() {
  return (
    <Dialog open={true /** TODO:あとで */}>
      {/** コンテンツ部分 */}
      <Stack pt={3} px={4} spacing={2}>
        {/** 確認メッセージ(タイトル) */}
        <Stack direction="row" spacing={1}>
          <ReportProblemIcon />
          <Typography>
            現在のデータベースには既にデータが存在します。
          </Typography>
        </Stack>
        {/** 本文 */}
        <Typography>
          　インポートを実行すると、
          <b>現在のすべてのデータが削除され、新しいデータに上書きされます。</b>
        </Typography>
        <Typography>　本当にインポートを実行してよろしいですか？</Typography>
      </Stack>
      {/** ボタン */}
      <DialogActions>
        <Button>実行する</Button>
        <Button>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
});
export default ImportOverwriteDialog;
