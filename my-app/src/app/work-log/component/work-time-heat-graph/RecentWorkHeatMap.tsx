import { Tooltip, Box, Typography } from "@mui/material";
import { memo } from "react";
import { RecentWorkHeatMapLogic } from "./RecentWorkHeatMapLogic";

/**
 * 最近(29~35日間)の日毎の稼働時間のヒートグラフ
 */
const RecentWorkHeatMap = memo(function RecentWorkHeatMap() {
  const {
    boxSize,
    gap,
    daysOfWeek,
    getColorByHours,
    getDisplayTime,
    onClick,
    weeks,
  } = RecentWorkHeatMapLogic();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      gap={`${gap}px`}
    >
      <Typography variant="h6" color="text.secondary">
        最近の稼働時間
      </Typography>
      {/* 曜日ラベル */}
      <Box display="flex" gap={`${gap}px`}>
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            sx={{
              width: boxSize,
              textAlign: "center",
              fontSize: 12,
              color: "#666",
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
      {weeks.map((week, wIdx) => (
        /** 行 */
        <Box key={wIdx} display="flex" gap={`${gap}px`}>
          {week.map((item, i) =>
            item && item.totalHours !== 0 ? (
              /** 列(ホバー時のツールチップ) */
              <Tooltip
                key={item.date}
                title={`${item.date}：${getDisplayTime(item.totalHours)}`}
                slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: 14, // フォントサイズだけを変更
                    },
                  },
                }}
                arrow
              >
                {/** 列(表示されるボックスごと) */}
                <Box
                  sx={(theme) => ({
                    width: boxSize,
                    height: boxSize,
                    bgcolor: getColorByHours(theme, item.totalHours),
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "transform 0.15s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  })}
                  onClick={() => onClick(item.date)}
                />
              </Tooltip>
            ) : (
              /** データがない場合の表示(ツールチップ/ホバー時のtransitionなし/クリック時のイベントもなし) */
              <Box
                key={i}
                sx={(theme) => ({
                  width: boxSize,
                  height: boxSize,
                  bgcolor: theme.palette.gray.normal,
                  borderRadius: 1,
                })}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
});

export default RecentWorkHeatMap;
