import SelectLikeDisplay from "@/component/SelectLikeDisplay/SelectLikeDisplay";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { memo } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SliderLikeDisplay from "@/component/SliderLikeDisplay/SliderLikeDisplay";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CompletedTaskEditDialogLogic } from "./CompletedTaskEditDialogLogic";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import MemoAddDialog from "../../../menu/dialog/MemoAddDialog/MemoAddDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリ名 */
  categoryName: string;
  /** タスク名 */
  taskName: string;
  /** 稼働時間の初期選択の値 */
  initialHours: number;
};

/**
 * 完了タスクの編集ダイアログ
 */
const CompletedTaskEditDialog = memo(function CompletedTaskEditDialog({
  open,
  onClose,
  itemId,
  categoryName,
  taskName,
  initialHours,
}: Props) {
  const { dailyHours, onChangeSelectHours, handleSave } =
    CompletedTaskEditDialogLogic({
      itemId,
      initialHours,
      onClose,
    });
  const {
    open: openDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
  const {
    open: openMemo,
    onOpen: onOpenMemo,
    onClose: onCloseMemo,
  } = useDialog();
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ pb: 3 }}>
          <Stack spacing={3} mt={1}>
            {/** カテゴリ */}
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              pr={1.5}
            >
              <SelectLikeDisplay text={categoryName} width={400} />
              <AddCircleOutlineIcon color="disabled" />
            </Stack>
            {/** タスク */}
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              pr={1.5}
            >
              <SelectLikeDisplay text={taskName} width={400} />
              <AddCircleOutlineIcon color="disabled" />
            </Stack>
            {/** 稼働時間/進捗/メモ追加ボタン */}
            <Stack direction="row" justifyContent={"space-between"} pr={4}>
              {/** 稼働時間 */}
              <FormControl sx={{ width: "20%" }}>
                <InputLabel
                  id="hours-select-label"
                  sx={{
                    left: 0, // ← 左寄せ
                    transform: "translate(0, -50%) scale(0.75)", // ← 初期位置に強制
                    whiteSpace: "nowrap", // 改行させない
                    overflow: "visible", // はみ出ても切らない
                  }}
                >
                  稼働時間(hour)
                </InputLabel>
                <Select
                  labelId="hours-select-label"
                  id="hours-select"
                  name="hours-select"
                  value={String(dailyHours)}
                  onChange={onChangeSelectHours}
                  label="稼働時間(hour)"
                  variant="standard"
                >
                  {[...Array(41)].map((_, i) => (
                    <MenuItem key={i} value={i * 0.25}>
                      {i * 0.25}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/** 進捗 */}
              <SliderLikeDisplay title={"進捗"} width={250} value={100} />
              {/** メモ追加ボタン */}
              <Button startIcon={<AddCommentIcon />} onClick={onOpenMemo}>
                メモを追加
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        {/** ボタン群 */}
        <Stack direction="row" justifyContent={"space-between"} py={2} px={4}>
          <Stack>
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              onClick={onOpenDelete}
            >
              削除
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button onClick={onClose}>キャンセル</Button>
            <Button
              startIcon={<CheckCircleIcon />}
              variant="contained"
              onClick={handleSave}
            >
              保存
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      {/** 確認ダイアログ */}
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          onAccept={() => {} /** TODO:すぐ後で定義 */}
        />
      )}
      {openMemo && (
        <MemoAddDialog
          taskList={[
            {
              id: itemId,
              taskName: taskName,
            },
          ]}
          open={openMemo}
          onClose={onCloseMemo}
          isTaskSelected={true}
        />
      )}
    </>
  );
});
export default CompletedTaskEditDialog;
