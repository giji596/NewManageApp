"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import PeriodSelectMenuButton from "./select-menu/PeriodSelectMenuButton";
import PeriodSelectDialogLogic from "./PeriodSelectDialogLogic";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
  /** 初期値(開始) */
  initialStartDate: Date;
  /** 初期値(終了) */
  initialEndDate: Date;
  /** 選択した範囲のデータを取得する関数 */
  getDataSelectRange: (start: Date, end: Date) => void;
};

/**
 * 表示期間を選択するダイアログ
 */
export default function PeriodSelectDialog({
  open,
  onClose,
  initialStartDate,
  initialEndDate,
  getDataSelectRange,
}: Props) {
  const {
    startYear,
    startMonth,
    startDay,
    handleChangeStartYear,
    handleChangeStartMonth,
    handleChangeStartDay,
    endYear,
    endMonth,
    endDay,
    handleChangeEndYear,
    handleChangeEndMonth,
    handleChangeEndDay,
    onClickSelect,
    isValid,
  } = PeriodSelectDialogLogic({
    onClose,
    initialStartDate,
    initialEndDate,
    getDataSelectRange,
  });
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>期間を選択</DialogTitle>
      <Stack height={10} pl={3} pb={1}>
        {!isValid && (
          <FormHelperText error>
            *開始期間が終了期間を上回っています。
          </FormHelperText>
        )}
      </Stack>
      <Stack direction="row" px={3} py={1.5} spacing={2} alignItems="center">
        <Stack>
          <Typography variant="caption">開始期間</Typography>
          <PeriodSelectMenuButton
            year={startYear}
            month={startMonth}
            day={startDay}
            onChangeYear={handleChangeStartYear}
            onChangeMonth={handleChangeStartMonth}
            onChangeDay={handleChangeStartDay}
          />
        </Stack>
        <Typography variant="h6">〜</Typography>
        <Stack>
          <Typography variant="caption">終了期間</Typography>
          <PeriodSelectMenuButton
            year={endYear}
            month={endMonth}
            day={endDay}
            onChangeYear={handleChangeEndYear}
            onChangeMonth={handleChangeEndMonth}
            onChangeDay={handleChangeEndDay}
          />
        </Stack>
      </Stack>
      <DialogActions>
        <Button onClick={onClose} color="error">
          キャンセル
        </Button>
        <Button disabled={!isValid} onClick={onClickSelect}>
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
}
