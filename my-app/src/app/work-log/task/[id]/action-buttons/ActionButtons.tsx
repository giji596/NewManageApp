"use client";
import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { memo } from "react";

type Props = {
  /** 完了状態かどうか */
  isCompleted: boolean;
  /** 編集ボタンを押した際のハンドラー */
  onClickEdit: () => void;
  /** 完了ボタンを押した際のハンドラー */
  onClickComplete: () => void;
  /** 削除ボタンを押した際のハンドラー */
  onClickDelete: () => void;
};

/**
 * タスク詳細　右下のボタン群
 */
const ActionButtons = memo(function ActionButtons({
  isCompleted,
  onClickEdit,
  onClickComplete,
  onClickDelete,
}: Props) {
  return (
    <Stack spacing={1.5} alignItems={"center"}>
      <Button
        sx={{ width: "50%" }}
        startIcon={<EditIcon />}
        onClick={onClickEdit}
      >
        編集する
      </Button>
      <Button
        sx={{ width: "50%" }}
        color="success"
        startIcon={<DoneIcon />}
        onClick={onClickComplete}
        disabled={isCompleted}
      >
        完了状態にする
      </Button>
      <Button
        sx={{ width: "50%" }}
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={onClickDelete}
      >
        削除する
      </Button>
    </Stack>
  );
});
export default ActionButtons;
