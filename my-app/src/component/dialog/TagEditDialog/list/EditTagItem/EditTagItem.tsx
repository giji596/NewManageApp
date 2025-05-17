import { IconButton, Stack, TextField } from "@mui/material";
import { memo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { EditTagItemLogic } from "./EditTagItemLogic";
import { Controller } from "react-hook-form";

type Props = {
  /** タグ名の初期値 */
  defaultTagName: string;
};

/**
 * 編集時のタグのリストアイテムのコンポーネント
 */
const EditTagItem = memo(function EditTagItem({ defaultTagName }: Props) {
  const { control } = EditTagItemLogic({ defaultTagName });
  return (
    <form>
      <Stack direction="row" justifyContent={"space-between"}>
        {/** 左部分(テキストフィールド) */}
        <Controller
          control={control}
          name="tagName"
          render={({ field }) => <TextField {...field} label="タグ名" />}
        />
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
    </form>
  );
});
export default EditTagItem;
