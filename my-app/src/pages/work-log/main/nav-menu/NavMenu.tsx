import { Box, Stack, Button, Typography } from "@mui/material";
import { memo } from "react";
import TodayIcon from "@mui/icons-material/Today";
import HistoryIcon from "@mui/icons-material/History";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExploreIcon from "@mui/icons-material/Explore";

const NavMenu = memo(function NavMenu() {
  const navButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 1,
    color: "primary.main",
    bgcolor: "white",
    border: "1px solid #ddd",
    borderRadius: 2,
    boxShadow: 1,
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "primary.light",
      color: "white",
      transform: "translateY(-2px)",
    },
  };
  return (
    <Box
      sx={{
        m: 5,
        width: 450,
        height: 600,
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
          clipPath: "polygon(100% 100%, 100% 85%, 10% 100%)",
          background:
            "linear-gradient(to bottom right, white 0%, white 50%, rgba(0, 0, 0, 0.4) 90%)",
          pointerEvents: "none",
        }}
      />
      {/* ボタンたち */}
      <Stack
        justifyContent={"space-around"}
        spacing={2}
        height={"100%"}
        px={3}
        py={1.5}
      >
        {/** 日付関連 */}
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" pl={2} gap={1}>
            <CalendarMonthIcon color="action" />
            <Typography variant="subtitle2" color="text.secondary">
              日付から移動
            </Typography>
          </Box>
          <Button sx={navButtonStyle}>
            <TodayIcon fontSize="large" />
            <Typography variant="caption">本日のページ</Typography>
          </Button>
          <Button sx={navButtonStyle}>
            <HistoryIcon fontSize="large" />
            <Typography variant="caption">昨日のページ</Typography>
          </Button>
        </Stack>
        {/** その他ナビゲーション */}
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" pl={1} gap={1}>
            <ExploreIcon color="action" />
            <Typography variant="subtitle2" color="text.secondary">
              その他のナビゲーション
            </Typography>
          </Box>
          <Button sx={navButtonStyle}>
            <DateRangeIcon fontSize="large" />
            <Typography variant="caption">日付ページ</Typography>
          </Button>
          <Button sx={navButtonStyle}>
            <AssignmentIcon fontSize="large" />
            <Typography variant="caption">タスクページ</Typography>
          </Button>
          <Button sx={navButtonStyle}>
            <CategoryIcon fontSize="large" />
            <Typography variant="caption">カテゴリページ</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
});
export default NavMenu;
