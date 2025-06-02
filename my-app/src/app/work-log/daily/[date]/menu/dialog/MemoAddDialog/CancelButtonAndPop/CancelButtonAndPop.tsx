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
      <Button onClick={handleClick} color="error">
        キャンセル
      </Button>
      <Popover
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Stack justifyContent={"flex-end"} sx={{ p: 2 }}>
          <Typography variant={"subtitle2"}>
            入力内容は破棄されます。続けますか？
          </Typography>
          <Button onClick={onAccept} sx={{ typography: "subtitle2" }}>
            破棄
          </Button>
        </Stack>
      </Popover>
    </>
  );
});
export default CancelButtonAndPop;
