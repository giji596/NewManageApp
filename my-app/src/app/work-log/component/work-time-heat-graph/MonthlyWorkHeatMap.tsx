import { Tooltip, Box } from "@mui/material";
import { memo } from "react";
import { MonthlyWorkHeatMapLogic } from "./MonthlyWorkHeatMapLogic";

/**
 * 過去1ヶ月間の日毎の稼働時間のヒートグラフ
 */
const MonthlyWorkHeatMap = memo(function MonthlyWorkHeatMap() {
  const {
    boxSize,
    gap,
    daysOfWeek,
    getColorByHours,
    getDisplayTime,
    onClick,
    weeks,
  } = MonthlyWorkHeatMapLogic();

  return (
    <Box display="flex" flexDirection="column" gap={`${gap}px`}>
      {/* 曜日ラベル */}
      <Box display="flex" gap={`${gap}px`}>
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            sx={{
              width: boxSize,
              textAlign: "center",
              fontSize: 10,
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
                arrow
              >
                {/** 列(表示されるボックスごと) */}
                <Box
                  sx={{
                    width: boxSize,
                    height: boxSize,
                    bgcolor: getColorByHours(item.totalHours),
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "transform 0.15s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => onClick(item.date)}
                />
              </Tooltip>
            ) : (
              /** データがない場合の表示(ツールチップ/ホバー時のtransitionなし/クリック時のイベントもなし) */
              <Box
                key={i}
                sx={{
                  width: boxSize,
                  height: boxSize,
                  bgcolor: "#ddd",
                  borderRadius: 1,
                }}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
});

export default MonthlyWorkHeatMap;
