"use client";
import { Stack, Typography } from "@mui/material";
import WorkCalendarPopoverButton from "./work-calendar-menu-button/WorkCalendarPopoverButton";
import { DateDisplayLogic } from "./DateDisplayLogic";

type Props = {
  /** 開始日 */
  firstActivityDate: string | null;
  /** 最終実施日(実施記録がない場合はnull) */
  lastActivityDate: string | null;
};

/**
 * タスク詳細　日付の表示部分
 */
export default function DateDisplay({
  firstActivityDate,
  lastActivityDate,
}: Props) {
  const { firstDateText, lastDateText } = DateDisplayLogic({
    firstActivityDate,
    lastActivityDate,
  });
  return (
    <Stack spacing={2}>
      <Stack alignItems={"center"}>
        <Typography color="text.primary" variant="subtitle1">
          開始日
        </Typography>
        <Typography color="text.primary" variant="h5">
          {firstDateText}
        </Typography>
      </Stack>
      <Stack alignItems={"center"} pb={2}>
        <Typography color="text.primary" variant="subtitle1">
          最終実施日
        </Typography>
        <Typography color="text.primary" variant="h5">
          {lastDateText}
        </Typography>
      </Stack>
      <WorkCalendarPopoverButton
        firstActivityDate={firstActivityDate}
        lastActivityDate={lastActivityDate}
      />
    </Stack>
  );
}
