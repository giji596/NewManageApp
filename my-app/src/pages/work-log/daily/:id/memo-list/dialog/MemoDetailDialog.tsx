import {
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * メモの詳細を表示するダイアログ
 */
export default function MemoDetailDialog({ open, onClose }: Props) {
  const isEdit = true;
  return (
    <Dialog
      open={open}
      onClose={
        onClose // TODO:編集中は閉じないみたいな感じにしたい？またはそのまま保存させるか？
      }
      fullWidth
    >
      {/** 全体 */}
      <Stack spacing={1} px={2} py={2}>
        {/** ヘッダー部分 */}
        <Stack direction="row" justifyContent={"space-between"}>
          {/** タイトル情報 */}
          <Stack spacing={1} maxWidth="450px" pl={1}>
            <Typography overflow="hidden" textOverflow={"ellipsis"} noWrap>
              タイトル：(メモのタイトル)
            </Typography>
            <Typography overflow="hidden" textOverflow={"ellipsis"} noWrap>
              タスク名：(タスク名)
            </Typography>
          </Stack>
          {/** アイコンボタン */}
          <Stack direction="row" spacing={2} pr={3}>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
            {/** 編集中かどうかで保存/編集ボタンを切り替え */}
            {isEdit && (
              <IconButton color="primary">
                <SaveIcon />
              </IconButton>
            )}
            {!isEdit && (
              <IconButton color="primary">
                <EditNoteIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
        {/** 本文の部分 */}
        <TextField disabled={!isEdit} multiline rows={5} label="本文" />
      </Stack>
    </Dialog>
  );
}
