import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TaskAddDialogLogic from "./TaskAddDialogLogic";
import useDialog from "@/hook/useDialog";
import CreateCategoryDialog from "@/component/dialog/CreateCategoryDialog/CreateCategoryDialog";
import CreateTaskDialog from "@/component/dialog/CreateTaskDialog/CreateTaskDialog";

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * 日付詳細 - タスクを追加するダイアログのコンポーネント
 */
export default function TaskAddDialog({ open, onClose }: Props) {
  const {
    categoryList,
    taskList,
    isLoading,
    selectedCategoryId,
    selectedTaskId,
    onChangeSelectedCategory,
    onChangeSelectedTask,
    handleAddDailyTask,
  } = TaskAddDialogLogic();
  const {
    open: openCreateTask,
    onOpen: onOpenCreateTask,
    onClose: onCloseCreateTask,
  } = useDialog();
  const {
    open: openCreateCategory,
    onOpen: onOpenCreateCategory,
    onClose: onCloseCreateCategory,
  } = useDialog();
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>タスクを追加する</DialogTitle>
        {/**コンテンツの部分 */}
        <Stack px={2} spacing={1}>
          {/** カテゴリのところ */}
          <Stack direction="row" spacing={1}>
            {/** セレクト*/}
            <FormControl fullWidth>
              <InputLabel>カテゴリ名</InputLabel>
              <Select
                label="カテゴリ名"
                value={String(selectedCategoryId)}
                onChange={onChangeSelectedCategory}
              >
                {categoryList.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/** 追加ボタン */}
            <IconButton
              onClick={onOpenCreateCategory}
              sx={{ width: 50, height: 50 }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Stack>
          {/** タスクのところ */}
          <Stack direction="row" spacing={1}>
            {/** セレクト */}
            <FormControl fullWidth>
              <InputLabel>タスク名</InputLabel>
              {isLoading && (
                <Select disabled label="タスク名" value={0}>
                  <MenuItem value={0}>
                    <CircularProgress size={22} />
                  </MenuItem>
                </Select>
              )}
              {!isLoading && taskList.length === 0 && (
                <Select disabled label="タスク名" value={0}>
                  <MenuItem value={0}>タスクがありません</MenuItem>
                </Select>
              )}
              {!isLoading && taskList.length > 0 && (
                <Select
                  label="タスク名"
                  value={String(selectedTaskId)}
                  onChange={onChangeSelectedTask}
                >
                  {taskList.map((task) => (
                    <MenuItem key={task.id} value={task.id}>
                      {task.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            {/** アイコンボタン */}
            <IconButton
              onClick={onOpenCreateTask}
              sx={{ width: 50, height: 50 }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Stack>
        </Stack>
        {/** ボタン */}
        <DialogActions>
          <Button color="error" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            startIcon={<AddTaskIcon />}
            onClick={handleAddDailyTask}
          >
            追加
          </Button>
        </DialogActions>
      </Dialog>
      {openCreateCategory && (
        <CreateCategoryDialog
          open={openCreateCategory}
          onClose={onCloseCreateCategory}
        />
      )}
      {openCreateTask && (
        <CreateTaskDialog
          initialCategoryId={selectedCategoryId}
          open={openCreateTask}
          onClose={onCloseCreateTask}
        />
      )}
    </>
  );
}
