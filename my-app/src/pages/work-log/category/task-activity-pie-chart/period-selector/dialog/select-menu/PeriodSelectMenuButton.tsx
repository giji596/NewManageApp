import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PeriodSelectMenuButtonLogic from "./PeriodSelectMenuButtonLogic";

type Props = {
  /** 年 */
  year: number;
  /** 月 */
  month: number;
  /** 日 */
  day: number;
  /** 年のセレクトを変えた時のハンドラー */
  onChangeYear: (e: SelectChangeEvent) => void;
  /** 月のセレクトを変えた時のハンドラー */
  onChangeMonth: (e: SelectChangeEvent) => void;
  /** 日のセレクトを変えた時のハンドラー */
  onChangeDay: (e: SelectChangeEvent) => void;
};

/**
 * 期間選択のメニューボタン
 */
export default function PeriodSelectMenuButton({
  year,
  month,
  day,
  onChangeYear,
  onChangeMonth,
  onChangeDay,
}: Props) {
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
            <InputLabel>年</InputLabel>
            <Select
              label="年"
              value={String(year)}
              onChange={onChangeYear}
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
            <InputLabel>月</InputLabel>
            <Select
              label="月"
              value={String(month)}
              onChange={onChangeMonth}
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
            <InputLabel>日</InputLabel>
            <Select
              label="日"
              value={String(day)}
              onChange={onChangeDay}
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
