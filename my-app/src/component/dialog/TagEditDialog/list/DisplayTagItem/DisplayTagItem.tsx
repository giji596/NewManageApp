import { IconButton, ListItemText, Stack } from "@mui/material";
import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
/**
 * タグリストの表示時のアイテム
 */
const DisplayTagItem = memo(function DisplayTagItem() {
  return (
    <Stack direction="row" justifyContent={"space-between"}>
      {/** 左側(タグ名表示) */}
      <ListItemText primary={"タグ名" /** TODO:親からもらう */} />
      {/** 右側(ボタン部分) */}
      <Stack direction="row">
        {/** 編集ボタン */}
        <IconButton>
          <EditIcon />
        </IconButton>
        {/** 削除ボタン */}
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
});
export default DisplayTagItem;
