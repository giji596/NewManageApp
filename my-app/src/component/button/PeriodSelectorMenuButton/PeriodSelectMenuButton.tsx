"use client";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PeriodSelectMenuButtonLogic from "./PeriodSelectMenuButtonLogic";
import { SelectRangeLogic } from "@/hook/useDateSelect";

type Props = {
  /** 日付選択のロジック */
  selectRangeLogic: SelectRangeLogic;
};

/**
 * 期間選択のメニューボタン
 */
export default function PeriodSelectMenuButton({ selectRangeLogic }: Props) {
  const { year, month, day, onChangeYear, onChangeMonth, onChangeDay } =
    selectRangeLogic;
  const {
    open,
    anchorEl,
    handleOpen,
    handleClose,
    buttonText,
    yearSelect,
    monthSelect,
    daySelect,
  } = PeriodSelectMenuButtonLogic({ year, month, day });
  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          textTransform: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          borderRadius: 0,
          pr: 0,
          pl: 1,
          minWidth: 120,
          color: "text.primary",
          fontSize: "1rem",
          justifyContent: "space-between",
          "&:hover": {
            backgroundColor: "transparent",
            borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
          },
          "&:focus": {
            outline: "none",
            borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
          },
        }}
        disableRipple
      >
        {buttonText}
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Stack direction={"row"} spacing={1} px={2} py={0.5}>
          <FormControl>
            <InputLabel id="year-select-label">年</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              name="year-select"
              label="年"
              value={String(year)}
              onChange={(e) => onChangeYear(Number(e.target.value))}
              sx={{ width: 125 }}
            >
              {yearSelect.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}年
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="month-select-label">月</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              name="month-select"
              label="月"
              value={String(month)}
              onChange={(e) => onChangeMonth(Number(e.target.value))}
              sx={{ width: 100 }}
            >
              {monthSelect.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}月
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="day-select-label">日</InputLabel>
            <Select
              labelId="day-select-label"
              id="day-select"
              name="day-select"
              label="日"
              value={String(day)}
              onChange={(e) => onChangeDay(Number(e.target.value))}
              sx={{ width: 100 }}
            >
              {daySelect.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}日
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Menu>
    </>
  );
}
