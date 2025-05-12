import { IconButton, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { memo } from "react";

type Props = {
  /** 現在表示している年 */
  currentYear: number;
  /** 現在表示している月（1〜12） */
  currentMonth: number;
  /** 前の月へ移動するハンドラー */
  onPrevMonth: () => void;
  /** 次の月へ移動するハンドラー */
  onNextMonth: () => void;
  /** 最も過去の月に到達しているか（戻るボタンの無効化用） */
  isMinMonth: boolean;
  /** 最も未来の月に到達しているか（進むボタンの無効化用） */
  isMaxMonth: boolean;
};

/**
 * 稼働のカレンダーのナビゲーション部分
 */
const WorkCalendarNav = memo(function WorkCalendarNav({
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  isMinMonth,
  isMaxMonth,
}: Props) {
  return (
    <Stack direction="row" spacing={3} alignItems={"center"}>
      {/** 戻る方のナビゲーション */}
      <IconButton
        sx={{
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1) translateX(-2px)",
          },
          "&:active": {
            transform: "scale(1.1) translateX(-6px)",
          },
        }}
        onClick={onPrevMonth}
        disabled={isMinMonth}
      >
        <NavigateBeforeIcon />
      </IconButton>
      {/** 表示中の年月について */}
      <Typography>
        {currentYear} 年 {currentMonth} 月
      </Typography>
      {/** 進む方のナビゲーション */}
      <IconButton
        sx={{
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1) translateX(2px)",
          },
          "&:active": {
            transform: "scale(1.1) translateX(6px)",
          },
        }}
        onClick={onNextMonth}
        disabled={isMaxMonth}
      >
        <NavigateNextIcon />
      </IconButton>
    </Stack>
  );
});
export default WorkCalendarNav;
