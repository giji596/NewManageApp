import { TagEditListItem } from "@/type/Tag";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { memo } from "react";
import { TagListLogic } from "./TagListLogic";
import EditTagItem from "./EditTagItem/EditTagItem";
import DisplayTagItem from "./DisplayTagItem/DisplayTagItem";
import TagConfirmDeleteDialog from "./TagConfirmDeleteDialog/TagConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import TagConfirmSaveDialog from "./TagConfirmSaveDialog/TagConfirmSaveDialog";

type Props = {
  /** タグの一覧 */
  tagList: TagEditListItem[];
  /** タグ削除時の追加イベント */
  onDeleteTag?: () => void;
};

/**
 * タグ編集ダイアログのタグ一覧のリスト
 */
const TagList = memo(function TagList({ tagList, onDeleteTag }: Props) {
  const {
    open: openDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDialog();
  const {
    open: openSave,
    onOpen: onOpenSave,
    onClose: onCloseSave,
  } = useDialog();
  const {
    editTargetId,
    deleteTargetId,
    isEditTargetId,
    setEditTarget,
    clearEditTarget,
    handleDelete,
    onClickDelete,
    onSave,
    onSubmit,
  } = TagListLogic({ onOpenDelete, onOpenSave, onDeleteTag });
  return (
    <>
      <Paper sx={{ height: 300, overflowY: "auto" }}>
        <List sx={{ p: 0 }}>
          {tagList.map((item, i) => (
            <div key={item.id}>
              <ListItem sx={{ py: 0.5 }}>
                {/** 編集(ターゲットが自身である場合) */}
                {isEditTargetId(item.id) && (
                  <EditTagItem
                    defaultTagName={item.name}
                    onSubmit={(data) => onSubmit(data, item.isUsed)}
                    onFinishEdit={clearEditTarget}
                  />
                )}
                {/** 表示の場合(ターゲットでない場合) */}
                {!isEditTargetId(item.id) && (
                  <DisplayTagItem
                    tagName={item.name}
                    onClickEdit={() => setEditTarget(item.id)}
                    onClickDelete={() => onClickDelete(item.id, item.isUsed)}
                  />
                )}
              </ListItem>
              {tagList.length - 1 !== i && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
      {/** ダイアログ */}
      {openDelete && deleteTargetId && (
        <TagConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          targetId={deleteTargetId}
          onDelete={() => handleDelete(deleteTargetId)}
        />
      )}
      {openSave && editTargetId && (
        <TagConfirmSaveDialog
          open={openSave}
          onClose={onCloseSave}
          targetId={editTargetId}
          onSave={onSave}
        />
      )}
    </>
  );
});
export default TagList;
