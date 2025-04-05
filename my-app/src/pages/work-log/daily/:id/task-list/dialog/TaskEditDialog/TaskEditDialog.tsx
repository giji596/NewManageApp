import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskEditDialogLogic from "./TaskEditDialogLogic";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import ConfirmSaveDialog from "@/component/dialog/ConfirmSaveDialog/ConfirmSaveDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリidの初期選択の値 */
  initialCategoryId: number;
  /** タスクidの初期選択の値 */
  initialTaskId: number;
  /** ダイアログの開閉状態 */
  open: boolean;
  /** 稼働時間の初期選択の値 */
  initialHours: number;
  /** ダイアログ閉じるイベント */
  onClose: () => void;
};

export default function TaskEditDialog({
  itemId,
  initialCategoryId,
  initialTaskId,
  initialHours,
  open,
  onClose,
}: Props) {
  const {
    categoryId,
    taskId,
    dailyHours,
    unSelected,
    taskList,
    categoryList,
    onChangeSelectCategory,
    onChangeSelectTask,
    onChangeSelectHours,
    handleSave,
    handleDelete,
  } = TaskEditDialogLogic({
    itemId,
    initialCategoryId,
    initialTaskId,
    initialHours,
  });
  const {
    open: openDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
  const {
    open: openSave,
    onClose: onCloseSave,
    onOpen: onOpenSave,
  } = useDialog();
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <FormControl fullWidth>
              <InputLabel>カテゴリ</InputLabel>
              <Select
                value={String(categoryId)}
                onChange={onChangeSelectCategory}
                label="カテゴリ"
              >
                {categoryList.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>タスク</InputLabel>
              <Select
                value={String(taskId)}
                onChange={onChangeSelectTask}
                label="タスク"
              >
                {taskList.map((task) => (
                  <MenuItem
                    key={task.id}
                    value={task.id}
                    disabled={task.id == 0}
                  >
                    {task.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>稼働時間(hour)</InputLabel>
              <Select
                value={String(dailyHours)}
                onChange={onChangeSelectHours}
                label="稼働時間(hour)"
              >
                {[...Array(41)].map((_, i) => (
                  <MenuItem key={i} value={i * 0.25}>
                    {i * 0.25}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

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
              disabled={unSelected}
              onClick={onOpenSave}
            >
              保存
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      {/** 確認ダイアログ */}
      <ConfirmDeleteDialog
        open={openDelete}
        onClose={onCloseDelete}
        onAccept={handleDelete}
      />
      <ConfirmSaveDialog
        open={openSave}
        onClose={onCloseSave}
        onAccept={handleSave}
      />
    </>
  );
}
