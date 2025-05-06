import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { memo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from "@mui/icons-material/Tune";
import DoneIcon from "@mui/icons-material/Done";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  /** 表示範囲変更クリックした際のハンドラー */
  onClickDisplayRange: () => void;
  /** カテゴリ完了クリックした際のハンドラー */
  onClickComplete: () => void;
  /** タスク追加クリックした際のハンドラー */
  onClickAddTask: () => void;
  /** 削除するクリックした際のハンドラー */
  onClickDelete: () => void;
};
/**
 * カテゴリヘッダーのアクションを格納したメニューと開閉ボタンのコンポーネント
 */
const CategoryActionMenuButton = memo(function CategoryActionMenuButton({
  onClickDisplayRange,
  onClickComplete,
  onClickAddTask,
  onClickDelete,
}: Props) {
  return (
    <>
      {/** ボタン部分 */}
      <IconButton sx={{ width: 40, height: 40, alignSelf: "center" }}>
        <MenuIcon />
      </IconButton>
      {/** めにゅー */}
      <Menu open={true /** TODO:あとで修正 */}>
        <MenuItem onClick={onClickDisplayRange}>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <Typography variant="body2">表示範囲を変更</Typography>
        </MenuItem>
        <MenuItem onClick={onClickComplete}>
          <ListItemIcon>
            <DoneIcon color="success" />
          </ListItemIcon>
          <Typography variant="body2" color="success">
            カテゴリを完了する
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClickAddTask}>
          <ListItemIcon>
            <AddTaskIcon color="primary" />
          </ListItemIcon>
          <Typography variant="body2" color="primary">
            タスクを追加する
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClickDelete}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <Typography variant="body2" color="error">
            削除する
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
});
export default CategoryActionMenuButton;
