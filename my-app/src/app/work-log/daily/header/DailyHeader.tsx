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
import useDialog from "@/hook/useDialog";
import DateDialog from "../dialog/DateDialog";

type Props = {
  /** ロード中かどうか */
  isLoading: boolean;
};
/**
 * 日付ページのヘッダーコンポーネント
 */
export default function DailyHeader({ isLoading }: Props) {
  const {
    open: openDialog,
    onClose: onCloseDialog,
    onOpen: onOpenDialog,
  } = useDialog();
  const {
    displayYear,
    displayMonth,
    handlePrevMonth,
    handleNextMonth,
    handleChangeYear,
    handleChangeMonth,
    monthArray,
    yearArray,
    isLastRange,
    isStartRange,
    anchorEl,
    open,
    handleClosePopover,
    handleOpenPopover,
    handleNavigateToday,
  } = DailyHeaderLogic();
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} p={2}>
        {/**　ひだり！！！！！ */}
        <Stack spacing={1}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            sx={{ justifyContent: "flex-start" }}
            onClick={handleNavigateToday}
          >
            今日を編集
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            color="success"
            sx={{ justifyContent: "flex-start" }}
            onClick={onOpenDialog}
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
            disabled={isStartRange}
            onClick={handlePrevMonth}
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
            disabled={isLastRange}
            onClick={handleNextMonth}
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
              name="year-select"
              value={displayYear}
              onChange={(e) => handleChangeYear(e.target.value)}
              sx={{ mb: 1 }}
            >
              {yearArray.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}年
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl disabled={isLoading} fullWidth variant="standard">
            <Select
              name="month-select"
              value={displayMonth}
              onChange={(e) => handleChangeMonth(e.target.value)}
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
      {/** ダイアログ */}
      {openDialog && (
        <DateDialog
          open={openDialog}
          onClose={onCloseDialog}
          navigatePage={() => {
            /**TODO: */
          }}
        />
      )}
    </>
  );
}
