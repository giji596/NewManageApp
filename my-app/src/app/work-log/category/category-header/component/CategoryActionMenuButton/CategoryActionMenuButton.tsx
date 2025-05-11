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
import { CategoryActionMenuButtonLogic } from "./CategoryActionMenuButtonLogic";

type Props = {
  /** 完了状態かどうか(表示項目の分岐に利用) */
  isCompleted: boolean;
  /** カテゴリの有無(表示の分岐に利用) */
  isNoCategory: boolean;
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
  isCompleted,
  isNoCategory,
  onClickDisplayRange,
  onClickComplete,
  onClickAddTask,
  onClickDelete,
}: Props) {
  const { anchorEl, open, handleOpen, handleClose } =
    CategoryActionMenuButtonLogic();
  return (
    <>
      {/** ボタン部分 */}
      <IconButton
        onClick={handleOpen}
        sx={{ width: 40, height: 40, alignSelf: "center" }}
      >
        <MenuIcon />
      </IconButton>
      {/** めにゅー */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/** 表示範囲 */}
        <MenuItem onClick={onClickDisplayRange}>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <Typography variant="body2">表示範囲を変更</Typography>
        </MenuItem>
        {/** 完了 */}
        {!isCompleted && (
          <MenuItem disabled={isNoCategory} onClick={onClickComplete}>
            <ListItemIcon>
              <DoneIcon color="success" />
            </ListItemIcon>
            <Typography variant="body2" color="success">
              カテゴリを完了する
            </Typography>
          </MenuItem>
        )}
        {/** タスク追加 */}
        {!isCompleted && (
          <MenuItem disabled={isNoCategory} onClick={onClickAddTask}>
            <ListItemIcon>
              <AddTaskIcon color="primary" />
            </ListItemIcon>
            <Typography variant="body2" color="primary">
              タスクを追加する
            </Typography>
          </MenuItem>
        )}
        {/** 削除 */}
        <MenuItem disabled={isNoCategory} onClick={onClickDelete}>
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
