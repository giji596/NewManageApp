import { Stack } from "@mui/material";
import { memo } from "react";
import WorkCalendarNav from "./nav/WorkCalendarNav";
import WorkCalendarBody from "./body/WorkCalendarBody";

/**
 *  稼働のカレンダー
 */
const WorkCalendar = memo(function WorkCalendar() {
  // TODO: stateで管理させる(year,month)
  const year = 2025;
  const month = 4;

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <WorkCalendarNav
        currentYear={year}
        currentMonth={month}
        onPrevMonth={() => {}} // TODO:
        onNextMonth={() => {}} // TODO:
        isMinMonth={false} // TODO:
        isMaxMonth={false} // TODO:
      />
      <WorkCalendarBody year={year} month={month} />
    </Stack>
  );
});
export default WorkCalendar;
