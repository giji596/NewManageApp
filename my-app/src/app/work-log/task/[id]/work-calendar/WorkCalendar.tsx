import { Stack } from "@mui/material";
import { memo } from "react";
import WorkCalendarNav from "./nav/WorkCalendarNav";
import WorkCalendarBody from "./body/WorkCalendarBody";
import { WorkCalendarLogic } from "./WorkCalendarLogic";

type Props = {
  /** 開始日 */
  startDate: string;
  /** 最終実施日 */
  lastDate: string;
};

/**
 *  稼働のカレンダー
 */
const WorkCalendar = memo(function WorkCalendar({
  startDate,
  lastDate,
}: Props) {
  const {
    year,
    month,
    handlePrevMonth,
    handleNextMonth,
    isMinMonth,
    isMaxMonth,
  } = WorkCalendarLogic({ startDate, lastDate });

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <WorkCalendarNav
        currentYear={year}
        currentMonth={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        isMinMonth={isMinMonth}
        isMaxMonth={isMaxMonth}
      />
      <WorkCalendarBody year={year} month={month} />
    </Stack>
  );
});
export default WorkCalendar;
