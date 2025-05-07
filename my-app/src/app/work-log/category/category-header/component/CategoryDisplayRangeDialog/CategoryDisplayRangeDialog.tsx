import PeriodSelectMenuButton from "@/component/button/PeriodSelectorMenuButton/PeriodSelectMenuButton";
import { SelectRangeLogic } from "@/hook/useDateSelect";
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

type Props = {
  /** 開始の日付範囲ロジック */
  startDateLogic: SelectRangeLogic;
  /** 終了の日付範囲ロジック */
  endDateLogic: SelectRangeLogic;
};

/**
 * 表示するカテゴリの範囲を設定するダイアログ
 */
const CategoryDisplayRangeDialog = memo(function CategoryDisplayRangeDialog({
  startDateLogic,
  endDateLogic,
}: Props) {
  return (
    <Dialog open={true /** TODO */}>
      <DialogTitle>期間を設定</DialogTitle>
      <FormControl sx={{ px: 3 }}>
        {/** メイン部分 */}
        {/** 期間ラジオグループ */}
        <FormLabel>最終稼働日</FormLabel>
        <RadioGroup row>
          <FormControlLabel control={<Radio />} label="過去3ヶ月以内" />
          <FormControlLabel control={<Radio />} label="全て" />
          <FormControlLabel control={<Radio />} label="カスタム" />
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
        <FormControlLabel control={<Checkbox />} label="完了済みを除く" />
        <Stack direction="row" spacing={1}>
          <Button color="error">キャンセル</Button>
          <Button>適応</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default CategoryDisplayRangeDialog;
