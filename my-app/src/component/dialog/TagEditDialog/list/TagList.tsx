import { TagEditListItem } from "@/type/Tag";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { memo } from "react";
import { TagListLogic } from "./TagListLogic";
import EditTagItem from "./EditTagItem/EditTagItem";
import DisplayTagItem from "./DisplayTagItem/DisplayTagItem";

type Props = {
  /** タグの一覧 */
  tagList: TagEditListItem[];
};

/**
 * タグ編集ダイアログのタグ一覧のリスト
 */
const TagList = memo(function TagList({ tagList }: Props) {
  const { isEditTargetId, setEditTarget, clearEditTarget, handleDelete } =
    TagListLogic();
  return (
    <>
      <Paper>
        <List sx={{ p: 0 }}>
          {tagList.map((item, i) => (
            <div key={item.id}>
              <ListItem>
                {/** 編集(ターゲットが自身である場合) */}
                {isEditTargetId(item.id) && (
                  <EditTagItem
                    defaultTagName={item.name}
                    onFinishEdit={clearEditTarget}
                  />
                )}
                {/** 表示の場合(ターゲットでない場合) */}
                {!isEditTargetId(item.id) && (
                  <DisplayTagItem
                    tagName={item.name}
                    onClickEdit={() => setEditTarget(item.id)}
                    onClickDelete={() =>
                      /** TODO:使用中であるばあいは削除前に確認ダイアログを表示させる */
                      item.isUsed
                        ? console.log("確認ダイアログ開く")
                        : handleDelete(item.id)
                    }
                  />
                )}
              </ListItem>
              {tagList.length - 1 !== i && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </>
  );
});
export default TagList;
