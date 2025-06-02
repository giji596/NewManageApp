import { Button, Popover, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { CancelButtonAndPopLogic } from "./CancelButtonAndPopLogic";

type Props = {
  /** 入力中の内容の有無 */
  isInput: boolean;
  /** キャンセル時のハンドラー */
  onCancel: () => void;
};

/**
 * キャンセルボタンと破棄の確認ポップオーバー
 */
const CancelButtonAndPop = memo(function CancelButtonAndPop({
  isInput,
  onCancel,
}: Props) {
  const { anchorEl, handleClick, handleClose, open, id, onAccept } =
    CancelButtonAndPopLogic({ isInput, onCancel });
  return (
    <>
      <Button onClick={handleClick}>キャンセル</Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Stack justifyContent={"flex-end"} spacing={1} sx={{ p: 2 }}>
          <Typography>入力内容は破棄されます。続けますか？</Typography>
          <Button onClick={onAccept}>破棄</Button>
        </Stack>
      </Popover>
    </>
  );
});
export default CancelButtonAndPop;
