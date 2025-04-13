import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type Props = {
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
export default function ActionButtons({
  onClickEdit,
  onClickComplete,
  onClickDelete,
}: Props) {
  return (
    <Stack spacing={1.5} alignItems={"center"}>
      <Button
        sx={{ width: "30%" }}
        startIcon={<EditIcon />}
        onClick={onClickEdit}
      >
        編集する
      </Button>
      <Button
        sx={{ width: "30%" }}
        color="success"
        startIcon={<DoneIcon />}
        onClick={onClickComplete}
      >
        完了状態にする
      </Button>
      <Button
        sx={{ width: "30%" }}
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={onClickDelete}
      >
        削除する
      </Button>
    </Stack>
  );
}
