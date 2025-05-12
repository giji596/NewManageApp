"use client";
import { Box } from "@mui/material";
import { WorkCalendarBodyLogic } from "./WorkCalendarBodyLogic";

type Props = {
  /** 表示中の年 */
  year: number;
  /** 表示中の月 */
  month: number;
};

/**
 * 稼働のカレンダーのボディ(日付表示)部分
 */
export const WorkCalendarBody = ({ year, month }: Props) => {
  const { weeks, isClickable, boxSize, gap, daysOfWeek } =
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
          {week.map((date, i) => {
            // 日付の有無で分岐
            if (date) {
              // クリック対象かチェック
              if (isClickable(date)) {
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
                      bgcolor: "#90caf9",
                      cursor: "pointer",
                      transition: "transform 0.15s",
                      "&:hover": {
                        bgcolor: "#64b5f6",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => {}} //TODO:すぐあとで
                  >
                    {date}
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
                    bgcolor: "#ddd",
                    cursor: "default",
                  }}
                >
                  {date}
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
                  bgcolor: "#eee",
                }}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
