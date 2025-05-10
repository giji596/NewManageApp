import PeriodSelectMenuButton from "@/component/button/PeriodSelectorMenuButton/PeriodSelectMenuButton";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import {
  CategoryDisplayRangeDialogLogic,
  DisplayRange,
} from "./CategoryDisplayRangeDialogLogic";

type Props = {
  /** ダイアログ開閉状態 */
  open: boolean;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
  /** 表示範囲の初期値 */
  initDisplayRange: DisplayRange;
  /** 開始日の初期値 */
  initStartDate: { initYear: number; initMonth: number; initDay: number };
  /** 終了日の初期値 */
  initEndDate: { initYear: number; initMonth: number; initDay: number };
  /** 完了の非表示の初期値 */
  initHideCompleted: boolean;
};

/**
 * 表示するカテゴリの範囲を設定するダイアログ
 */
const CategoryDisplayRangeDialog = memo(function CategoryDisplayRangeDialog({
  open,
  onClose,
  initDisplayRange,
  initStartDate,
  initEndDate,
  initHideCompleted,
}: Props) {
  const {
    displayRange,
    onChangeDisplayRange,
    startDateLogic,
    endDateLogic,
    hideCompleted,
    onChangeHideCompleted,
  } = CategoryDisplayRangeDialogLogic({
    initDisplayRange,
    initStartDate,
    initEndDate,
    initHideCompleted,
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>期間を設定</DialogTitle>
      <FormControl sx={{ px: 3 }}>
        {/** メイン部分 */}
        {/** 期間ラジオグループ */}
        <FormLabel>最終稼働日</FormLabel>
        <RadioGroup
          row
          onChange={(e) => onChangeDisplayRange(e.target.value)}
          value={displayRange}
        >
          <FormControlLabel
            control={<Radio value="last-3-months" />}
            label="過去3ヶ月以内"
          />
          <FormControlLabel control={<Radio value="all" />} label="全て" />
          <FormControlLabel
            control={<Radio value="custom" />}
            label="カスタム"
          />
        </RadioGroup>
      </FormControl>
      {/** 日付選択 */}
      <Stack
        direction="row"
        py={2}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <PeriodSelectMenuButton selectRangeLogic={startDateLogic} />
        <Typography>〜</Typography>
        <PeriodSelectMenuButton selectRangeLogic={endDateLogic} />
      </Stack>
      {/** 下部(チェックボックス + ボタン) */}
      <Stack direction="row" justifyContent={"space-between"} px={2} pb={2}>
        {/** 完了込みかのチェックボックス */}
        <FormControlLabel
          control={
            <Checkbox
              checked={hideCompleted}
              onChange={onChangeHideCompleted}
            />
          }
          label="完了済みを除く"
        />
        <Stack direction="row" spacing={1}>
          <Button color="error" onClick={onClose}>
            キャンセル
          </Button>
          <Button>適応</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default CategoryDisplayRangeDialog;
