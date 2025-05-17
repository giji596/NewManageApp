import { TagEditListItem } from "@/type/Tag";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { memo } from "react";
import { TagListLogic } from "./TagListLogic";

type Props = {
  /** タグの一覧 */
  tagList: TagEditListItem[];
};

/**
 * タグ編集ダイアログのタグ一覧のリスト
 */
const TagList = memo(function TagList({ tagList }: Props) {
  const { isEditTargetId, setEditTarget, clearEditTarget } = TagListLogic();
  return (
    <Paper>
      <List sx={{ p: 0 }}>
        {tagList.map((item, i) => (
          <div key={item.id}>
            <ListItem>
              {/** TODO:分岐で作成済みのコンポーネントを表示させる */}
              {/** 編集(ターゲットが自身である場合) */}
              {isEditTargetId(item.id) && item.name}
              {/** 表示の場合(ターゲットでない場合) */}
              {!isEditTargetId(item.id) && item.name}
            </ListItem>
            {tagList.length - 1 !== i && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
});
export default TagList;
