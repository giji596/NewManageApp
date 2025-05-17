import { IconButton, Stack, TextField } from "@mui/material";
import { memo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
/**
 * 編集時のタグのリストアイテムのコンポーネント
 */
const EditTagItem = memo(function EditTagItem() {
  return (
    <Stack direction="row" justifyContent={"space-between"}>
      {/** 左部分(テキストフィールド) */}
      <TextField label="タグ名" />
      {/** 右部分(ボタン部分) */}
      <Stack direction="row">
        {/** 保存ボタン */}
        <IconButton color="primary">
          <SaveIcon />
        </IconButton>
        {/** リセットボタン */}
        <IconButton color="error">
          <RestartAltIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
});
export default EditTagItem;
