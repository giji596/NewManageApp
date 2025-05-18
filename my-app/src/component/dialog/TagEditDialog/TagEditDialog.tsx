import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { memo } from "react";
import TagList from "./list/TagList";
import AddIcon from "@mui/icons-material/Add";
import { TagEditDialogLogic } from "./TagEditDialogLogic";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};
/**
 * タグを編集するダイアログ
 */
const TagEditDialog = memo(function TagEditDialog({ open, onClose }: Props) {
  const { tagList } = TagEditDialogLogic();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>タグを編集</DialogTitle>
      {/** コンテンツ(全体) */}
      <Stack p={2} spacing={1}>
        {/** 未使用のタグのみ表示設定 */}
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="未使用のタグのみ表示する"
          slotProps={{ typography: { fontSize: "14px" } }}
        />
        {/** タグリスト */}
        <TagList tagList={tagList} />
        {/** 追加ボタン */}
        <Button sx={{ width: "25%" }} startIcon={<AddIcon />}>
          タグを追加
        </Button>
      </Stack>
    </Dialog>
  );
});
export default TagEditDialog;
