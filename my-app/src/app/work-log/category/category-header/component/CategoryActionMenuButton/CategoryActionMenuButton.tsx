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
/**
 * カテゴリヘッダーのアクションを格納したメニューと開閉ボタンのコンポーネント
 */
const CategoryActionMenuButton = memo(function CategoryActionMenuButton() {
  return (
    <>
      {/** ボタン部分 */}
      <IconButton sx={{ width: 40, height: 40, alignSelf: "center" }}>
        <MenuIcon />
      </IconButton>
      {/** めにゅー */}
      <Menu open={true /** TODO:あとで修正 */}>
        <MenuItem>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <Typography variant="body2">表示範囲を変更</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DoneIcon color="success" />
          </ListItemIcon>
          <Typography variant="body2" color="success">
            カテゴリを完了する
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AddTaskIcon color="primary" />
          </ListItemIcon>
          <Typography variant="body2" color="primary">
            タスクを追加する
          </Typography>
        </MenuItem>
        <MenuItem>
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
