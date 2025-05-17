import { Divider, List, ListItem, Paper } from "@mui/material";
import { memo } from "react";

/**
 * タグ編集ダイアログのタグ一覧のリスト
 */
const TagList = memo(function TagList() {
  const data = Array(3).fill(null);
  return (
    <Paper>
      <List sx={{ p: 0 }}>
        {data.map((_, i) => (
          <div key={i}>
            <ListItem>aaa</ListItem>
            {data.length - 1 !== i && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
});
export default TagList;
