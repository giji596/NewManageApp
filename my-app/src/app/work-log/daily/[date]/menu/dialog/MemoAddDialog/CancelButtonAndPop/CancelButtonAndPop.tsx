import { Button, Popover, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { CancelButtonAndPopLogic } from "./CancelButtonAndPopLogic";

/**
 * キャンセルボタンと破棄の確認ポップオーバー
 */
const CancelButtonAndPop = memo(function CancelButtonAndPop() {
  const { anchorEl, handleClick, handleClose, open, id } =
    CancelButtonAndPopLogic();
  return (
    <>
      <Button onClick={handleClick}>キャンセル</Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Stack justifyContent={"flex-end"} spacing={1} sx={{ p: 2 }}>
          <Typography>入力内容は破棄されます。続けますか？</Typography>
          <Button onClick={() => {}}>破棄</Button>
        </Stack>
      </Popover>
    </>
  );
});
export default CancelButtonAndPop;
