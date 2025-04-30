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
import { useDateSelectMenuButton } from "./out-side-logic";

type SelectValueProps = ReturnType<typeof useDateSelectMenuButton>;
type Props = {
  /** 名称(識別/アクセシビリティ用) */
  name: string;
  /** 選択中の値に関するパラメータ */
  selectValueProps: SelectValueProps;
  /** disabledかどうか */
  disabled: boolean;
};
/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネント
 */
const DateSelectMenuButton = memo(function DateSelectMenuButton({
  name,
  selectValueProps,
  disabled,
}: Props) {
  const { year, onChangeYear, month, onChangeMonth, onChangeDay } =
    selectValueProps;
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
