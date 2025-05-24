"use client";
import { Box } from "@mui/material";
import { WorkCalendarBodyLogic } from "./WorkCalendarBodyLogic";
import { memo } from "react";

type Props = {
  /** 表示中の年 */
  year: number;
  /** 表示中の月 */
  month: number;
};

/**
 * 稼働のカレンダーのボディ(日付表示)部分
 */
const WorkCalendarBody = memo(function WorkCalendarBody({
  year,
  month,
}: Props) {
  const { weeks, isClickable, boxSize, gap, daysOfWeek, onClickDay } =
    WorkCalendarBodyLogic({ year, month });
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      gap={`${gap}px`}
    >
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
      {/** 列 */}
      {weeks.map((week, wIdx) => (
        <Box key={wIdx} display="flex" gap={`${gap}px`}>
          {/** 行 */}
          {week.map((day, i) => {
            // 日付の有無で分岐
            if (day) {
              // クリック対象かチェック
              if (isClickable(day)) {
                return (
                  /** クリック可能な日付の場合 */
                  <Box
                    key={i}
                    sx={{
                      width: boxSize,
                      height: boxSize,
                      textAlign: "center",
                      lineHeight: "40px",
                      borderRadius: 1,
                      bgcolor: "heatGraph.blue.1",
                      cursor: "pointer",
                      transition: "transform 0.15s",
                      "&:hover": {
                        bgcolor: "heatGraph.blue.3",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => onClickDay(day)}
                  >
                    {day}
                  </Box>
                );
              }

              return (
                /** クリックできない日付の場合 */
                <Box
                  key={i}
                  sx={{
                    width: boxSize,
                    height: boxSize,
                    textAlign: "center",
                    lineHeight: "40px",
                    borderRadius: 1,
                    bgcolor: "gray.normal",
                    cursor: "default",
                  }}
                >
                  {day}
                </Box>
              );
            }
            return (
              /** 日付なしの空欄の場合 */
              <Box
                key={i}
                sx={{
                  width: boxSize,
                  height: boxSize,
                  lineHeight: "40px",
                  borderRadius: 1,
                  bgcolor: "gray.light",
                }}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
});
export default WorkCalendarBody;
