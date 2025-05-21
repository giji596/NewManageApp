import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import TagList from "./list/TagList";
import AddIcon from "@mui/icons-material/Add";
import { TagEditDialogLogic } from "./TagEditDialogLogic";
import useDialog from "@/hook/useDialog";
import CreateTagDialog from "../CreateTagDialog/CreateTagDialog";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
  /** タグ作成後に呼び出しする関数(親で必要な場合のみ) */
  editActions?: {
    set: (newId: number) => void;
    clear: (targetId: number) => void;
  };
};
/**
 * タグを編集するダイアログ
 */
const TagEditDialog = memo(function TagEditDialog({
  open,
  onClose,
  editActions,
}: Props) {
  const { tagList, noTagItem, showOnlyUnused, toggleShowOnlyUnused } =
    TagEditDialogLogic();
  const { open: openAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDialog();
  return (
    <>
      {tagList && ( // フェッチ前はダイアログ自体を開かせない
        <Dialog open={open} onClose={onClose} fullWidth>
          <DialogTitle>タグを編集</DialogTitle>
          {/** コンテンツ(全体) */}
          <Stack p={2} spacing={1}>
            {/** 未使用のタグのみ表示設定 */}
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={showOnlyUnused}
                  onChange={toggleShowOnlyUnused}
                />
              }
              label="未使用のタグのみ表示する"
              slotProps={{ typography: { fontSize: "14px" } }}
            />
            {/** タグリスト */}
            {noTagItem && (
              <Typography
                color="textDisabled"
                pl={3}
                pb={2}
                sx={{ cursor: "default" }}
              >
                タグがありません
              </Typography>
            )}
            {!noTagItem && (
              <TagList tagList={tagList} onDeleteTag={editActions?.clear} />
            )}
            {/** 追加ボタン */}
            <Button
              sx={{ width: "25%" }}
              startIcon={<AddIcon />}
              onClick={onOpenAdd}
            >
              タグを追加
            </Button>
          </Stack>
        </Dialog>
      )}
      {openAdd && (
        <CreateTagDialog
          open={openAdd}
          onClose={onCloseAdd}
          onCreateTag={editActions?.set}
        />
      )}
    </>
  );
});
export default TagEditDialog;
