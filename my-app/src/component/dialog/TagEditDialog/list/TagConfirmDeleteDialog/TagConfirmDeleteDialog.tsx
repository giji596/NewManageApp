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
import { TagConfirmDeleteDialogLogic } from "./TagConfirmDeleteDialogLogic";

type Props = {
  /** 削除対象のid(データ取得に利用) */
  targetId: number;
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 削除のリクエスト処理 */
  onDelete: () => Promise<void>;
};
/**
 * タグの削除時の確認ダイアログ
 */
const TagConfirmDeleteDialog = memo(function TagConfirmDeleteDialog({
  targetId,
  open,
  onClose,
  onDelete,
}: Props) {
  const { memoTitleList, hideItemCount, onClickDelete } =
    TagConfirmDeleteDialogLogic({ targetId, onClose, onDelete });

  return (
    <Dialog open={open} onClose={onClose}>
      {/** データフェッチ完了するまでは非表示にする  */}
      {memoTitleList && hideItemCount && (
        <>
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
              {hideItemCount > 0 && (
                <Typography>...他{hideItemCount}件</Typography>
              )}
            </ul>
            {/** 本文下部 */}
            <Typography pl={1}>本当に削除してもよろしいですか？</Typography>
          </DialogContent>
          {/** ボタン */}
          <DialogActions>
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={onClickDelete}
            >
              削除
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
});
export default TagConfirmDeleteDialog;
