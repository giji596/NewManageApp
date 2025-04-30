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
  /** 年の選択変える関数 */
  onChangeSelectYear: (v: number) => void;
  /** 月の選択変える関数 */
  onChangeSelectMonth: (v: number) => void;
  /** 日の選択変える関数 */
  onChangeSelectDay: (v: number) => void;
  /** disabledかどうか */
  disabled: boolean;
};
/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネント
 */
const DateSelectMenuButton = memo(function DateSelectMenuButton({
  name,
  selectYear,
  selectMonth,
  selectDay,
  onChangeSelectYear,
  onChangeSelectMonth,
  onChangeSelectDay,
  disabled,
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
      <Button aria-label={name} onClick={handleClick} disabled={disabled}>
        {dateLabel}
      </Button>
      {open && (
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
                onChange={(e) => onChangeSelectYear(Number(e.target.value))}
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
                onChange={(e) => onChangeSelectMonth(Number(e.target.value))}
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
                onChange={(e) => onChangeSelectDay(Number(e.target.value))}
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
      )}
    </>
  );
});
export default DateSelectMenuButton;
