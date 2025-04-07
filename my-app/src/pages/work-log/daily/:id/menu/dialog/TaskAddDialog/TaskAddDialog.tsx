import { CategoryOption } from "@/type/Category";
import { TaskOption } from "@/type/Task";
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

type Props = {
  /** カテゴリ一覧 */
  categoryList: CategoryOption[];
  /** タスク一覧 */
  taskList: TaskOption[];
  /** ロード状態(カテゴリーを変えた時に再度タスク一覧を取得する場合) */
  isLoading: boolean;
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * 日付詳細 - タスクを追加するダイアログのコンポーネント
 */
export default function TaskAddDialog({
  categoryList,
  taskList,
  isLoading,
  open,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>タスクを追加する</DialogTitle>
      {/**コンテンツの部分 */}
      <Stack px={2} spacing={1}>
        {/** カテゴリのところ */}
        <Stack direction="row" spacing={1}>
          {/** セレクト*/}
          <FormControl fullWidth>
            <InputLabel>カテゴリ名</InputLabel>
            <Select label="カテゴリ名" defaultValue={categoryList[0].id}>
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/** 追加ボタン */}
          <IconButton sx={{ width: 50, height: 50 }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
        {/** タスクのところ */}
        <Stack direction="row" spacing={1}>
          {/** セレクト */}
          <FormControl fullWidth>
            <InputLabel>タスク名</InputLabel>
            {isLoading && (
              <Select disabled label="タスク名" defaultValue={0}>
                <MenuItem value={0}>
                  <CircularProgress size={22} />
                </MenuItem>
              </Select>
            )}
            {!isLoading && taskList.length === 0 && (
              <Select disabled label="タスク名" defaultValue={0}>
                <MenuItem value={0}>タスクがありません</MenuItem>
              </Select>
            )}
            {!isLoading && taskList.length > 0 && (
              <Select label="タスク名" defaultValue={taskList[0].id}>
                {taskList.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          {/** アイコンボタン */}
          <IconButton sx={{ width: 50, height: 50 }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
      </Stack>
      {/** ボタン */}
      <DialogActions>
        <Button color="error">キャンセル</Button>
        <Button variant="contained" startIcon={<AddTaskIcon />}>
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
