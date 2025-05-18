import { IconButton, Stack, TextField } from "@mui/material";
import { memo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { EditTagItemLogic, SubmitTagData } from "./EditTagItemLogic";
import { Controller } from "react-hook-form";

type Props = {
  /** タグ名の初期値 */
  defaultTagName: string;
  /** 送信時のハンドラー */
  onSubmit: (data: SubmitTagData) => Promise<void>;
  /** 編集状態から元の状態に戻るハンドラー */
  onFinishEdit: () => void;
};

/**
 * 編集時のタグのリストアイテムのコンポーネント
 */
const EditTagItem = memo(function EditTagItem({
  defaultTagName,
  onSubmit,
  onFinishEdit,
}: Props) {
  const { control, isSendable, handleSubmit } = EditTagItemLogic({
    defaultTagName,
  });
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        {/** 左部分(テキストフィールド) */}
        <Controller
          control={control}
          name="tagName"
          rules={{ required: true }} // 空欄は許容しない
          render={({ field }) => <TextField {...field} label="タグ名" />}
        />
        {/** 右部分(ボタン部分) */}
        <Stack direction="row">
          {/** 保存ボタン */}
          <IconButton color="primary" disabled={!isSendable} type="submit">
            <SaveIcon />
          </IconButton>
          {/** リセットボタン(RHFのresetではなく編集 -> 表示に移行することで内容を破棄させる) */}
          <IconButton color="error" onClick={onFinishEdit}>
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Stack>
    </form>
  );
});
export default EditTagItem;
