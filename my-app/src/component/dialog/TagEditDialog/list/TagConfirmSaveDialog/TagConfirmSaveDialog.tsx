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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  /** 保存対象のid(データ取得に利用) */
  targetId: number;
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 保存のリクエスト処理 */
  onSave: () => Promise<void>;
};

/**
 * タグ保存時に表示する確認ダイアログ(使用中の場合に確認用に表示)
 */
const TagConfirmSaveDialog = memo(function TagConfirmSaveDialog({
  targetId,
  open,
  onClose,
  onSave,
}: Props) {
  const { memoTitleList, hideItemCount, onClickSave } =
    TagConfirmSaveDialogLogic({
      targetId,
      onClose,
      onSave,
    });
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
              {hideItemCount > 0 && (
                <Typography>...他{hideItemCount}件</Typography>
              )}
            </ul>
            {/** 本文下部 */}
            <Typography pl={1}>本当に変更してもよろしいですか？</Typography>
          </DialogContent>
          {/** ボタン */}
          <DialogActions>
            <Button
              startIcon={<CheckCircleIcon />}
              color="success"
              onClick={onClickSave}
            >
              保存
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
});
export default TagConfirmSaveDialog;
