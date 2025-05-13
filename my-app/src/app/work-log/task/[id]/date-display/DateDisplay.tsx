"use client";
import { Stack, Typography } from "@mui/material";
import WorkCalendarPopoverButton from "./work-calendar-menu-button/WorkCalendarPopoverButton";
import { DateDisplayLogic } from "./DateDisplayLogic";

type Props = {
  /** 開始日 */
  startDate: string | null;
  /** 最終実施日(実施記録がない場合はnull) */
  lastDate: string | null;
};

/**
 * タスク詳細　日付の表示部分
 */
export default function DateDisplay({ startDate, lastDate }: Props) {
  const { lastDateText } = DateDisplayLogic({ lastDate });
  return (
    <Stack spacing={2}>
      <Stack alignItems={"center"}>
        <Typography variant="subtitle1">開始日</Typography>
        <Typography variant="h5">{startDate}</Typography>
      </Stack>
      <Stack alignItems={"center"} pb={2}>
        <Typography variant="subtitle1">最終実施日</Typography>
        <Typography variant="h5">{lastDateText}</Typography>
      </Stack>
      <WorkCalendarPopoverButton startDate={startDate} lastDate={lastDate} />
    </Stack>
  );
}
