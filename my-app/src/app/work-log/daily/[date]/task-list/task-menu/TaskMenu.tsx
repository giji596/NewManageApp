"use client";
import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import ListIcon from "@mui/icons-material/List";

type Props = {
  /** ナビゲーションのアクティブかどうか */
  isActive: boolean;
  /** 編集押した時のハンドラー */
  onClickEdit: () => void;
  /** タスクページ移動押した時のハンドラー */
  onClickNavigateTask: () => void;
  /** カテゴリページ移動押した時のハンドラー */
  onClickNavigateCategory: () => void;
};

/**
 * 日次詳細タスクテーブルの操作メニュー部分
 */
export default function TaskMenu({
  isActive,
  onClickEdit,
  onClickNavigateTask,
  onClickNavigateCategory,
}: Props) {
  return (
    <Stack direction="row" spacing={5} px={2} py={1}>
      <Button
        onClick={onClickEdit}
        disabled={!isActive}
        variant="text"
        startIcon={<EditIcon />}
        sx={{
          textTransform: "none",
          px: 2,
          py: 1,
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
          },
        }}
      >
        編集
      </Button>
      <Button
        onClick={onClickNavigateTask}
        disabled={!isActive}
        variant="text"
        startIcon={<ListIcon />}
        sx={{
          textTransform: "none",
          px: 2,
          py: 1,
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
          },
        }}
      >
        タスクページへ移動
      </Button>
      <Button
        onClick={onClickNavigateCategory}
        disabled={!isActive}
        variant="text"
        startIcon={<CategoryIcon />}
        sx={{
          textTransform: "none",
          px: 2,
          py: 1,
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
          },
        }}
      >
        カテゴリーページへ移動
      </Button>
    </Stack>
  );
}
