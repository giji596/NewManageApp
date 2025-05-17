import { TagEditListItem } from "@/type/Tag";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { memo } from "react";

type Props = {
  /** タグの一覧 */
  tagList: TagEditListItem[];
};

/**
 * タグ編集ダイアログのタグ一覧のリスト
 */
const TagList = memo(function TagList({ tagList }: Props) {
  return (
    <Paper>
      <List sx={{ p: 0 }}>
        {tagList.map((item, i) => (
          <div key={item.id}>
            <ListItem>{item.name}</ListItem>
            {tagList.length - 1 !== i && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
});
export default TagList;
