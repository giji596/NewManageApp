"use client";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import EditIcon from "@mui/icons-material/Edit";
import DailyHeaderLogic from "./DailyHeaderLogic";

type Props = {
  /** 表示する年 */
  displayYear: string;
  /** 表示する月 */
  displayMonth: string;
  /** ロード中かどうか */
  isLoading: boolean;
  /** 表示月を一つ戻す関数 */
  handlePrev: () => void;
  /** 表示月を一つ進める関数 */
  handleNext: () => void;
  /** 指定した年に飛ぶ関数 */
  handleYearChange: (value: string) => void;
  /** 指定した月に飛ぶ関数 */
  handleMonthChange: (value: string) => void;
  /** 今日を編集押した際のハンドラー */
  onClickEditToday: () => void;
  /** 日付を選択して編集を押した際のハンドラー */
  onClickEditSelectDate: () => void;
};
/**
 * 日付ページのヘッダーコンポーネント
 */
export default function DailyHeader({
  displayYear,
  displayMonth,
  isLoading,
  handlePrev,
  handleNext,
  handleYearChange,
  handleMonthChange,
  onClickEditToday,
  onClickEditSelectDate,
}: Props) {
  const { monthArray, anchorEl, open, handleClosePopover, handleOpenPopover } =
    DailyHeaderLogic();
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} p={2}>
        {/**　ひだり！！！！！ */}
        <Stack spacing={1}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            sx={{ justifyContent: "flex-start" }}
            onClick={onClickEditToday}
          >
            今日を編集
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            color="success"
            sx={{ justifyContent: "flex-start" }}
            onClick={onClickEditSelectDate}
          >
            日付を指定して編集
          </Button>
        </Stack>
        {/** みぎ！！！！！ */}
        <Stack height="40px" direction="row">
          <IconButton
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.2) translateX(-5px)" },
            }}
            onClick={handlePrev}
            loading={isLoading}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Button
            onClick={handleOpenPopover}
            disabled={isLoading}
            sx={{ borderRadius: "50%" }}
          >
            {displayYear}年{displayMonth}月
          </Button>
          <IconButton
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.2) translateX(5px)" },
            }}
            onClick={handleNext}
            loading={isLoading}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </Stack>
      {/* ポップオーバー */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Stack direction="row" spacing={1} px={2} py={1}>
          <FormControl
            disabled={isLoading}
            variant="standard"
            fullWidth
            sx={{ minWidth: "80px" }}
          >
            <Select
              value={displayYear}
              onChange={(e) => handleYearChange(e.target.value)}
              sx={{ mb: 1 }}
            >
              {[...Array(10)].map((_, i) => {
                const year = 2020 + i;
                return (
                  <MenuItem key={year} value={year}>
                    {year}年
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl disabled={isLoading} fullWidth variant="standard">
            <Select
              value={displayMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              sx={{ mb: 1 }}
            >
              {monthArray.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Popover>
    </>
  );
}
