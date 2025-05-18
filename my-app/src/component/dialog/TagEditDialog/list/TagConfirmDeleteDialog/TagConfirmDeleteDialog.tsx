import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { memo } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * タグの削除時の確認ダイアログ
 */
const TagConfirmDeleteDialog = memo(function TagConfirmDeleteDialog() {
  const memoTitleList = ["メモ1", "メモ2", "メモ3", "メモ4", "メモ5"]; // TODO: 実際はフェッチ 0~5件取ってくる
  const usedCount = 8; // TODO:実際はフェッチ ここで利用されている箇所の数を取得する
  const hideItemCount = usedCount - 5;
  return (
    <Dialog open={true /** TODO:あとで */}>
      {/** タイトル */}
      <DialogTitle>
        <WarningAmberIcon
          color="warning"
          sx={{ verticalAlign: "-15%", mr: 1 }}
        />
        タグ削除の確認
      </DialogTitle>
      {/** コンテンツ */}
      <DialogContent>
        {/** 本文上部 */}
        <Typography whiteSpace={"pre-line"} pl={1}>
          該当のタグは、以下のメモに使用されています。 {"\n"}
          タグを削除すると、該当メモのタグ情報はクリアされます。
        </Typography>
        {/** 関連メモを表示 */}
        <ul>
          {memoTitleList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
          {hideItemCount > 0 && <Typography>...他{hideItemCount}件</Typography>}
        </ul>
        {/** 本文下部 */}
        <Typography pl={1}>本当に削除してもよろしいですか？</Typography>
      </DialogContent>
      {/** ボタン */}
      <DialogActions>
        <Button>キャンセル</Button>
        <Button startIcon={<DeleteIcon />} color="error" variant="outlined">
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default TagConfirmDeleteDialog;
