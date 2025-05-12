import { memo } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IconButton, Popover } from "@mui/material";
import WorkCalendar from "../work-calendar/WorkCalendar";
import { WorkCalendarPopoverButtonLogic } from "./WorkCalendarPopoverButtonLogic";

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
  const { anchorEl, handleOpen, handleClose, open, id } =
    WorkCalendarPopoverButtonLogic();
  return (
    <>
      <IconButton
        sx={{ width: 60, height: 60, alignSelf: "center" }}
        onClick={handleOpen}
      >
        <CalendarMonthIcon fontSize="large" />
      </IconButton>
      {open && (
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          anchorEl={anchorEl}
          id={id}
          onClose={handleClose}
        >
          <WorkCalendar startDate={startDate} lastDate={lastDate} />
        </Popover>
      )}
    </>
  );
});
export default WorkCalendarPopoverButton;
