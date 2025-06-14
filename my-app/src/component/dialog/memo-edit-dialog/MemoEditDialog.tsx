"use client";
import {
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Controller } from "react-hook-form";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import MemoEditDialogLogic from "./MemoEditDialogLogic";
import TagEditDialog from "../TagEditDialog/TagEditDialog";
import { memo } from "react";

type Props = {
  /** メモid */
  id: number;
  /** メモタイトル */
  title: string;
  /* タグ名 */
  tagName: string;
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * メモ編集のダイアログ
 */
const MemoEditDialog = memo(function MemoEditDialog({
  id,
  title,
  tagName,
  open,
  onClose,
}: Props) {
  const {
    tagList,
    isEdit,
    control,
    isLoading,
    isSending,
    handleEdit,
    handleReset,
    handleDelete,
    onSubmit,
    tagEditorActions,
  } = MemoEditDialogLogic({
    id,
    title,
    tagName,
    onClose,
  });
  const {
    open: openDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
  const { open: openTag, onClose: onCloseTag, onOpen: onOpenTag } = useDialog();
  return (
    <>
      <Dialog open={open} onClose={isEdit ? () => {} : onClose} fullWidth>
        {/** 全体 */}
        <Stack spacing={1} px={2} py={2}>
          {/** ヘッダー部分 */}
          <form onSubmit={onSubmit}>
            <Stack direction="row" justifyContent={"space-between"}>
              {/** タイトル情報 */}
              <Stack spacing={1} width="350px" pl={1} pb={2}>
                {/** タイトル */}
                <Stack
                  direction="row"
                  justifyContent={"end"}
                  alignItems={"center"}
                >
                  <Typography>タイトル：</Typography>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        sx={{ width: 250 }}
                        disabled={!isEdit}
                      />
                    )}
                  />
                </Stack>
                {/** タグ */}
                <Stack
                  direction="row"
                  justifyContent={"end"}
                  alignItems={"center"}
                >
                  <Typography> タグ：</Typography>
                  {isLoading && <CircularProgress />}
                  {!isLoading && (
                    <FormControl>
                      <Controller
                        name="tagId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            variant="standard"
                            disabled={!isEdit}
                            sx={{ width: 210 }}
                          >
                            {tagList.map((tag) => (
                              <MenuItem key={tag.id} value={tag.id}>
                                {tag.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  )}
                  {/** タグ作成ボタン */}
                  <IconButton onClick={onOpenTag} disabled={!isEdit}>
                    <AddCircleIcon />
                  </IconButton>
                </Stack>
              </Stack>
              {/** アイコンボタン */}
              <Stack direction="row" spacing={2} pr={3} alignItems="center">
                {/** 編集中かどうかで保存/編集ボタン 削除/リセットボタン を切り替え */}
                {isEdit && (
                  <>
                    <IconButton
                      onClick={handleReset}
                      color="error"
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    >
                      <RestartAltIcon />
                    </IconButton>
                    <IconButton
                      type="submit"
                      color="primary"
                      loading={isSending}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </>
                )}
                {!isEdit && (
                  <>
                    <IconButton
                      onClick={onOpenDelete}
                      color="error"
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      disabled={isLoading}
                      onClick={handleEdit}
                      color="primary"
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
            </Stack>
            {/** 本文の部分 */}
            {isLoading && (
              <Stack
                height="150px"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress />
              </Stack>
            )}
            {!isLoading && (
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="main-text"
                    fullWidth
                    disabled={!isEdit}
                    multiline
                    rows={5}
                    label="本文"
                  />
                )}
              />
            )}
          </form>
        </Stack>
      </Dialog>
      {/** ダイアログ群 */}
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          onAccept={handleDelete}
        />
      )}
      {openTag && (
        <TagEditDialog
          open={openTag}
          onClose={onCloseTag}
          editActions={tagEditorActions}
        />
      )}
    </>
  );
});
export default MemoEditDialog;
