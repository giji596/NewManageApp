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

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリidの初期選択の値 */
  initialCategoryId: number;
  /** タスクidの初期選択の値 */
  initialTaskId: number;
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じるイベント */
  onClose: () => void;
};

export default function TaskEditDialog({
  itemId,
  initialCategoryId,
  initialTaskId,
  open,
  onClose,
}: Props) {
  const {
    categoryId,
    taskId,
    unSelected,
    taskList,
    categoryList,
    onChangeSelectCategory,
    onChangeSelectTask,
    handleSave,
    handleDelete,
  } = TaskEditDialogLogic({
    itemId,
    initialCategoryId,
    initialTaskId,
  });
  return (
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
                <MenuItem key={task.id} value={task.id} disabled={task.id == 0}>
                  {task.name}
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
            onClick={handleDelete} // TODO:実際はダイアログを開かせる
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
            onClick={handleSave} // TODO:実際はダイアログを開かせる
          >
            保存
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
