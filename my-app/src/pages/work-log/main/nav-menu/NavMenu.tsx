import { Box, Stack, Button } from "@mui/material";
import { memo } from "react";

const NavMenu = memo(function NavMenu() {
  return (
    <Box
      sx={{
        m: 5,
        width: 400,
        height: 400,
        border: "1px solid #ccc",
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        boxShadow: 3,
        bgcolor: "#fff",
      }}
    >
      {/* 右下グラデーション */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "60%",
          height: "60%",
          clipPath: "polygon(100% 100%, 100% 70%, 0% 100%)",
          background:
            "linear-gradient(to bottom right, white 0%, white 50%, rgba(0, 0, 0, 0.4) 90%)",
          pointerEvents: "none",
        }}
      />
      {/* ボタンたち */}
      <Stack
        justifyContent={"space-around"}
        spacing={2}
        sx={{ p: 1.5, height: "100%" }}
      >
        <Stack spacing={2}>
          <Button variant="contained">本日のページへ移動</Button>
          <Button variant="contained">昨日のページへ移動</Button>
        </Stack>
        <Stack spacing={2}>
          <Button variant="contained">日付ページへ移動</Button>
          <Button variant="contained">タスクページへ移動</Button>
          <Button variant="contained">カテゴリページへ移動</Button>
        </Stack>
      </Stack>
    </Box>
  );
});
export default NavMenu;
