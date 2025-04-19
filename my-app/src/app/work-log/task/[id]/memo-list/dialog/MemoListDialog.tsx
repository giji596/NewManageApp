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
import { Controller } from "react-hook-form";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import MemoListDialogLogic from "./MemoListDialogLogic";

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
 * タスク詳細 メモのダイアログ
 */
export default function MemoListDialog({
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
    handleDelete,
    onSubmit,
  } = MemoListDialogLogic({
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
                <Stack direction="row" spacing="2" alignItems={"center"}>
                  <Typography>タイトル：</Typography>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        sx={{ flexGrow: 1 }}
                        disabled={!isEdit}
                      />
                    )}
                  />
                </Stack>
                {/** タグ */}
                <Stack direction="row" spacing="2" alignItems={"center"}>
                  <Typography> タグ：</Typography>
                  {isLoading && <CircularProgress />}
                  {!isLoading && (
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Controller
                        name="tagId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            variant="standard"
                            disabled={!isEdit}
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
                </Stack>
              </Stack>
              {/** アイコンボタン */}
              <Stack direction="row" spacing={2} pr={3}>
                <IconButton onClick={onOpenDelete} color="error">
                  <DeleteIcon />
                </IconButton>
                {/** 編集中かどうかで保存/編集ボタンを切り替え */}
                {isEdit && (
                  <IconButton type="submit" color="primary" loading={isSending}>
                    <SaveIcon />
                  </IconButton>
                )}
                {!isEdit && (
                  <IconButton
                    disabled={isLoading}
                    onClick={handleEdit}
                    color="primary"
                  >
                    <EditNoteIcon />
                  </IconButton>
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
      <ConfirmDeleteDialog
        open={openDelete}
        onClose={onCloseDelete}
        onAccept={handleDelete}
      />
    </>
  );
}
