"use client";
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import TaskEditDialogLogic from "./TaskEditDialogLogic";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateCategoryDialog from "@/component/dialog/CreateCategoryDialog/CreateCategoryDialog";
import CreateTaskDialog from "@/component/dialog/CreateTaskDialog/CreateTaskDialog";
import MemoAddDialog from "../../../menu/dialog/MemoAddDialog/MemoAddDialog";

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
    isTaskSelectAvailable,
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
    onClose,
  });
  const {
    open: openDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
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
  const {
    open: openMemo,
    onOpen: onOpenMemo,
    onClose: onCloseMemo,
  } = useDialog();
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            {/** カテゴリ */}
            <Stack direction="row" spacing={1}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">カテゴリ</InputLabel>
                {categoryList && (
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category-select"
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
                )}
              </FormControl>
              {/** アイコンボタン */}
              <IconButton
                onClick={onOpenCreateCategory}
                sx={{ width: 50, height: 50 }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Stack>
            {/** タスク */}
            <Stack direction="row" spacing={1}>
              {/** セレクト */}
              <FormControl fullWidth>
                <InputLabel id="task-select-label">タスク</InputLabel>
                {isTaskSelectAvailable && (
                  <Select
                    labelId="task-select-label"
                    id="task-select"
                    name="task-select"
                    value={String(taskId)}
                    onChange={onChangeSelectTask}
                    label="タスク"
                  >
                    {taskList!.map((task) => (
                      <MenuItem
                        key={task.id}
                        value={task.id}
                        disabled={task.id == 0}
                      >
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
            {/** 稼働時間/メモ追加ボタン */}
            <Stack direction="row" justifyContent={"space-between"} pr={4}>
              {/** 稼働時間 */}
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="hours-select-label">稼働時間(hour)</InputLabel>
                <Select
                  labelId="hours-select-label"
                  id="hours-select"
                  name="hours-select"
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
              {/** メモ追加ボタン */}
              <Button startIcon={<AddCommentIcon />} onClick={onOpenMemo}>
                メモを追加
              </Button>
            </Stack>
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
          onAccept={handleDelete}
        />
      )}
      {openCreateCategory && (
        <CreateCategoryDialog
          open={openCreateCategory}
          onClose={onCloseCreateCategory}
        />
      )}
      {openCreateTask && (
        <CreateTaskDialog
          initialCategoryId={categoryId}
          open={openCreateTask}
          onClose={onCloseCreateTask}
        />
      )}
      {openMemo && taskList && (
        <MemoAddDialog
          taskList={[
            {
              id: itemId,
              taskName: taskList.find((v) => v.id === taskId)?.name ?? "",
            },
          ]}
          open={openMemo}
          onClose={onCloseMemo}
          isTaskSelected={true}
        />
      )}
    </>
  );
}
