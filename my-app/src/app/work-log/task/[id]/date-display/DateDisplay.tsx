"use client";
import { Stack, Typography } from "@mui/material";
import WorkCalendarPopoverButton from "./work-calendar-menu-button/WorkCalendarPopoverButton";

type Props = {
  /** 開始日 */
  startDate: string;
  /** 最終実施日 */
  lastDate: string;
};

/**
 * タスク詳細　日付の表示部分
 */
export default function DateDisplay({ startDate, lastDate }: Props) {
  return (
    <Stack spacing={2}>
      <Stack alignItems={"center"}>
        <Typography variant="subtitle1">開始日</Typography>
        <Typography variant="h5">{startDate}</Typography>
      </Stack>
      <Stack alignItems={"center"} pb={2}>
        <Typography variant="subtitle1">最終実施日</Typography>
        <Typography variant="h5">{lastDate}</Typography>
      </Stack>
      <WorkCalendarPopoverButton startDate={startDate} lastDate={lastDate} />
    </Stack>
  );
}
