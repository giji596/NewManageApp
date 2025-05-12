import { Stack } from "@mui/material";
import { memo } from "react";
import WorkCalendarNav from "./nav/WorkCalendarNav";
import WorkCalendarBody from "./body/WorkCalendarBody";
import { WorkCalendarLogic } from "./WorkCalendarLogic";

/**
 *  稼働のカレンダー
 */
const WorkCalendar = memo(function WorkCalendar() {
  const {
    year,
    month,
    handlePrevMonth,
    handleNextMonth,
    isMinMonth,
    isMaxMonth,
  } = WorkCalendarLogic();

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
