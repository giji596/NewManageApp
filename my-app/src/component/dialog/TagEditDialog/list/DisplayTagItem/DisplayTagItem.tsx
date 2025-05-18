import { IconButton, ListItemText, Stack } from "@mui/material";
import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  /** タグ名 */
  tagName: string;
  /** 編集ボタン押した時のハンドラー */
  onClickEdit: () => void;
  /** 削除ボタン押した時のハンドラー */
  onClickDelete: () => void;
};
/**
 * タグリストの表示時のアイテム
 */
const DisplayTagItem = memo(function DisplayTagItem({
  tagName,
  onClickEdit,
  onClickDelete,
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={"space-between"}
      width="100%"
    >
      {/** 左側(タグ名表示) */}
      <ListItemText primary={tagName} />
      {/** 右側(ボタン部分) */}
      <Stack direction="row">
        {/** 編集ボタン */}
        <IconButton color="primary" onClick={onClickEdit}>
          <EditIcon />
        </IconButton>
        {/** 削除ボタン */}
        <IconButton color="error" onClick={onClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
});
export default DisplayTagItem;
