import { memo } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IconButton, Popover } from "@mui/material";
import WorkCalendar from "../work-calendar/WorkCalendar";

type Props = {
  /** 開始日(yyyy/MM/dd) */
  startDate: string;
  /** 最終実施日(yyyy/MM/dd) */
  lastDate: string;
};

/**
 * 稼働カレンダーを含むポップを表示するボタン
 */
const WorkCalendarPopoverButton = memo(function WorkCalendarMenuButton({
  startDate,
  lastDate,
}: Props) {
  return (
    <>
      <IconButton sx={{ width: 60, height: 60, alignSelf: "center" }}>
        <CalendarMonthIcon fontSize="large" />
      </IconButton>
      {true && (
        <Popover open={true}>
          <WorkCalendar startDate={startDate} lastDate={lastDate} />
        </Popover>
      )}
    </>
  );
});
export default WorkCalendarPopoverButton;
