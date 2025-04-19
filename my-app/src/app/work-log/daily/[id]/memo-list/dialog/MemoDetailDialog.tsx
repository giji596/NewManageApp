import {
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import MemoDetailDialogLogic from "./MemoDetailDialogLogic";
import { Controller } from "react-hook-form";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** メモid */
  id: number;
  /** メモタイトル */
  title: string;
  /** タスク名 */
  taskName: string;
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * メモの詳細を表示するダイアログ
 */
export default function MemoDetailDialog({
  id,
  title,
  taskName,
  open,
  onClose,
}: Props) {
  const {
    isEdit,
    control,
    isLoading,
    isSending,
    handleEdit,
    handleDelete,
    onSubmit,
  } = MemoDetailDialogLogic({
    id,
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
              <Stack spacing={1} maxWidth="450px" pl={1}>
                <Typography overflow="hidden" textOverflow={"ellipsis"} noWrap>
                  タイトル：{title}
                </Typography>
                <Typography overflow="hidden" textOverflow={"ellipsis"} noWrap>
                  タスク名：{taskName}
                </Typography>
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
