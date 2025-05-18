import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { memo } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { TagConfirmSaveDialogLogic } from "./TagConfirmSaveDialogLogic";

/**
 * タグ保存時に表示する確認ダイアログ(使用中の場合に確認用に表示)
 */
const TagConfirmSaveDialog = memo(function TagConfirmSaveDialog() {
  const { memoTitleList, hideItemCount } = TagConfirmSaveDialogLogic();
  return (
    <Dialog open={true /** TODO:あとで */}>
      {/** タイトル */}
      <DialogTitle>
        <WarningAmberIcon
          color="warning"
          sx={{ verticalAlign: "-15%", mr: 1 }}
        />
        タグ保存の確認
      </DialogTitle>
      {/** コンテンツ */}
      <DialogContent>
        {/** 本文上部 */}
        <Typography whiteSpace={"pre-line"} pl={1}>
          該当のタグは、以下のメモに使用されています。 {"\n"}
          タグ名を変更すると、該当メモのタグ名も変更されます。
        </Typography>
        {/** 関連メモを表示 */}
        <ul>
          {memoTitleList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
          {hideItemCount > 0 && <Typography>...他{hideItemCount}件</Typography>}
        </ul>
        {/** 本文下部 */}
        <Typography pl={1}>本当に変更してもよろしいですか？</Typography>
      </DialogContent>
      {/** ボタン */}
      <DialogActions>
        <Button>キャンセル</Button>
        <Button>保存</Button>
      </DialogActions>
    </Dialog>
  );
});
export default TagConfirmSaveDialog;
