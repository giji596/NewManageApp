"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import MemoAddDialogLogic from "./MemoAddDialogLogic";
import { Controller } from "react-hook-form";
import { TaskOption } from "@/type/Task";

type Props = {
  /** タスクの一覧 */
  taskList: TaskOption[];
  /** ダイアログ開閉状態 */
  open: boolean;
  /** タスクを指定しているかどうか */
  isTaskSelected: boolean;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
};

/**
 * 日付詳細 メモを追加するためのダイアログ
 */
export default function MemoAddDialog({
  taskList,
  open,
  isTaskSelected,
  onClose,
}: Props) {
  const { tagList, onSubmit, control, isValid } = MemoAddDialogLogic({
    onClose,
    taskList,
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>メモを追加</DialogTitle>
      {/** タスクの選択フォーム */}
      <form onSubmit={onSubmit}>
        <Stack spacing={1} px={2}>
          <FormControl fullWidth>
            <InputLabel id="task-select-label">タスクを選ぶ</InputLabel>
            {!isTaskSelected && (
              <Controller
                name="taskId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="task-select-label"
                    id="task-select"
                    label="タスクを選ぶ"
                  >
                    {taskList.map((task) => (
                      <MenuItem key={task.id} value={task.id}>
                        {task.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            )}
            {isTaskSelected && (
              <Select
                labelId="task-select-label"
                id="task-select-disabled"
                disabled
                label="タスクを選ぶ"
                defaultValue={taskList[0].id}
              >
                <MenuItem value={taskList[0].id}>{taskList[0].name}</MenuItem>
              </Select>
            )}
          </FormControl>
          {/** タイトル/タグ */}
          <Stack direction="row" spacing={1}>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="タイトル" sx={{ width: "80%" }} />
              )}
            />
            <FormControl sx={{ width: "20%" }}>
              <InputLabel id="tag-select-label">タグ</InputLabel>
              <Controller
                name="tagId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="tag-select-label"
                    id="tag-select-label"
                    label="タグ"
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
          </Stack>
          {/**　本文 */}
          <Controller
            name="text"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} id="text" label="本文" multiline rows={4} />
            )}
          />
        </Stack>
        <DialogActions>
          <Button onClick={onClose} color="error">
            キャンセル
          </Button>
          <Button
            disabled={!isValid}
            type="submit"
            variant="contained"
            startIcon={<NoteAddIcon />}
          >
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
