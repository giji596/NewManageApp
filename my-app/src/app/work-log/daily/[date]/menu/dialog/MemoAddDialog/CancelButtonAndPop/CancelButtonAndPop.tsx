import { Button, Popover, Stack, Typography } from "@mui/material";
import { memo } from "react";

/**
 * キャンセルボタンと破棄の確認ポップオーバー
 */
const CancelButtonAndPop = memo(function CancelButtonAndPop() {
  return (
    <>
      <Button>キャンセル</Button>
      <Popover open={true /** TODO */}>
        <Stack justifyContent={"flex-end"}>
          <Typography>入力内容は破棄されます。続けますか？</Typography>
          <Button>破棄</Button>
        </Stack>
      </Popover>
    </>
  );
});
export default CancelButtonAndPop;
