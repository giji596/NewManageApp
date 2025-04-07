import { TagOption } from "@/type/Tag";
import { TaskOption } from "@/type/Task";
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

type Props = {
  /** タスクの一覧 */
  taskList: TaskOption[];
  /** タグの一覧 */
  tagList: TagOption[];
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
  tagList,
  open,
  isTaskSelected,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>メモを追加</DialogTitle>
      {/** タスクの選択フォーム */}
      <Stack spacing={1} px={2}>
        <FormControl fullWidth>
          <InputLabel>タスクを選ぶ</InputLabel>
          {!isTaskSelected && (
            <Select label="タスクを選ぶ" defaultValue={taskList[0].id}>
              {taskList.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.name}
                </MenuItem>
              ))}
            </Select>
          )}
          {isTaskSelected && (
            <Select disabled label="タスクを選ぶ" defaultValue={taskList[0].id}>
              <MenuItem value={taskList[0].id}>{taskList[0].name}</MenuItem>
            </Select>
          )}
        </FormControl>
        {/** タイトル/タグ */}
        <Stack direction="row" spacing={1}>
          <TextField label="タイトル" sx={{ width: "80%" }} />
          <FormControl sx={{ width: "20%" }}>
            <InputLabel>タグ</InputLabel>
            <Select label="タグ" defaultValue={tagList[0].id}>
              {tagList.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {/**　本文 */}
        <TextField label="本文" multiline rows={4} />
      </Stack>
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button variant="contained" startIcon={<NoteAddIcon />}>
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
