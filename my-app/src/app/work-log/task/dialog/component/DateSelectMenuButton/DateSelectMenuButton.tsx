import {
  Button,
  Menu,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { memo } from "react";
import { DateSelectMenuButtonLogic } from "./DateSelectMenuButtonLogic";

type Props = {
  /** 名称(識別/アクセシビリティ用) */
  name: string;
  /** 選択中の年 */
  selectYear: number;
  /** 選択中の月 */
  selectMonth: number;
  /** 選択中の日 */
  selectDay: number;
};
/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネント
 */
const DateSelectMenuButton = memo(function DateSelectMenuButton({
  name,
  selectYear,
  selectMonth,
  selectDay,
}: Props) {
  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    yearSelectList,
    monthSelectList,
    daySelectList,
    getLabel,
    dateLabel,
  } = DateSelectMenuButtonLogic({
    selectYear,
    selectMonth,
    selectDay,
  });

  return (
    <>
      <Button aria-label={name} onClick={handleClick}>
        {dateLabel}
      </Button>
      <Menu
        id={`${name}-menu`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Stack direction="row" px={1.5} py={0.5}>
          <FormControl>
            <Select
              name={`${name}-year-select`}
              aria-label={`${name}-year-select`}
              variant="standard"
              value={selectYear}
            >
              {yearSelectList.map((v) => (
                <MenuItem key={v} value={v}>
                  {getLabel(v)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              name={`${name}-month-select`}
              aria-label={`${name}-month-select`}
              variant="standard"
              value={selectMonth}
            >
              {monthSelectList.map((v) => (
                <MenuItem key={v} value={v}>
                  {getLabel(v)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              name={`${name}-day-select`}
              aria-label={`${name}-day-select`}
              variant="standard"
              value={selectDay}
            >
              {daySelectList.map((v) => (
                <MenuItem key={v} value={v}>
                  {getLabel(v)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Menu>
    </>
  );
});
export default DateSelectMenuButton;
