import { IconButton, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { memo } from "react";

/**
 * 稼働のカレンダーのナビゲーション部分
 */
const WorkCalendarNav = memo(function WorkCalendarNav() {
  const year = 2025;
  const month = 4;
  return (
    <Stack direction="row" spacing={3} alignItems={"center"}>
      {/** 戻る方のナビゲーション */}
      <IconButton>
        <NavigateBeforeIcon />
      </IconButton>
      {/** 表示中の年月について */}
      <Typography>
        {year} 年 {month} 月
      </Typography>
      {/** 進む方のナビゲーション */}
      <IconButton>
        <NavigateNextIcon />
      </IconButton>
    </Stack>
  );
});
export default WorkCalendarNav;
