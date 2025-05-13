import { Stack } from "@mui/material";
import { memo } from "react";
import WorkCalendarNav from "./nav/WorkCalendarNav";
import WorkCalendarBody from "./body/WorkCalendarBody";
import { WorkCalendarLogic } from "./WorkCalendarLogic";

type Props = {
  /** 開始日 */
  firstActivityDate: string;
  /** 最終実施日 */
  lastActivityDate: string;
};

/**
 *  稼働のカレンダー
 */
const WorkCalendar = memo(function WorkCalendar({
  firstActivityDate,
  lastActivityDate,
}: Props) {
  const {
    year,
    month,
    handlePrevMonth,
    handleNextMonth,
    isMinMonth,
    isMaxMonth,
  } = WorkCalendarLogic({ firstActivityDate, lastActivityDate });

  return (
    <Stack alignItems={"center"} spacing={0.5} p={2}>
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
