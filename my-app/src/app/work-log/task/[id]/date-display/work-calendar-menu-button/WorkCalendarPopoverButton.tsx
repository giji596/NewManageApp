import { memo } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IconButton, Popover } from "@mui/material";
import WorkCalendar from "./work-calendar/WorkCalendar";
import { WorkCalendarPopoverButtonLogic } from "./WorkCalendarPopoverButtonLogic";

type Props = {
  /** 開始日(yyyy/MM/dd) */
  firstActivityDate: string | null;
  /** 最終実施日(yyyy/MM/dd) 実施記録がない場合はnull */
  lastActivityDate: string | null;
};

/**
 * 稼働カレンダーを含むポップを表示するボタン
 */
const WorkCalendarPopoverButton = memo(function WorkCalendarMenuButton({
  firstActivityDate,
  lastActivityDate,
}: Props) {
  const { anchorEl, handleOpen, handleClose, open, id, noActivity } =
    WorkCalendarPopoverButtonLogic({ lastActivityDate });
  return (
    <>
      <IconButton
        sx={{ width: 60, height: 60, alignSelf: "center" }}
        onClick={handleOpen}
        disabled={noActivity} // 実施記録がない場合はdisabled
      >
        <CalendarMonthIcon fontSize="large" />
      </IconButton>
      {open && lastActivityDate && firstActivityDate && (
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
          <WorkCalendar
            firstActivityDate={firstActivityDate}
            lastActivityDate={lastActivityDate}
          />
        </Popover>
      )}
    </>
  );
});
export default WorkCalendarPopoverButton;
