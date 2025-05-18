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
import { dummyTagEditListItems } from "@/dummy/memo-tag";

/**
 * タグを編集するダイアログ
 */
const TagEditDialog = memo(function TagEditDialog() {
  return (
    <Dialog open={true /** TODO:あとで */} fullWidth>
      <DialogTitle>タグを編集</DialogTitle>
      {/** コンテンツ(全体) */}
      <Stack p={2} spacing={1}>
        {/** 未使用のタグのみ表示設定 */}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="未使用のタグのみ表示する"
        />
        {/** タグリスト */}
        <TagList tagList={dummyTagEditListItems /** TODO:あとで */} />
        {/** 追加ボタン */}
        <Button>追加</Button>
      </Stack>
    </Dialog>
  );
});
export default TagEditDialog;
