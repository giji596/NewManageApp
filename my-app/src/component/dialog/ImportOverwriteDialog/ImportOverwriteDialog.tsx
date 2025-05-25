import {
  Button,
  Dialog,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

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
          <ReportProblemIcon color="warning" />
          <Typography color="warning">
            現在のデータベースには既にデータが存在します。
          </Typography>
        </Stack>
        {/** 本文 */}
        <Typography color="text.primary">
          　インポートを実行すると、
          <b>現在のすべてのデータが削除され、新しいデータに上書きされます。</b>
        </Typography>
        <Typography color="text.primary">
          　本当にインポートを実行してよろしいですか？
        </Typography>
      </Stack>
      {/** ボタン */}
      <DialogActions>
        <Button startIcon={<SwapHorizIcon />}>実行する</Button>
        <Button color="error">キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
});
export default ImportOverwriteDialog;
