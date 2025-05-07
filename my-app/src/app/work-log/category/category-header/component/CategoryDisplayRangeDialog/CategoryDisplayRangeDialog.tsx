import PeriodSelectMenuButton from "@/component/dialog/PeriodSelectDialog/select-menu/PeriodSelectMenuButton";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";

/**
 * 表示するカテゴリの範囲を設定するダイアログ
 */
const CategoryDisplayRangeDialog = memo(function CategoryDisplayRangeDialog() {
  return (
    <Dialog open={true /** TODO */}>
      <DialogTitle>期間を設定</DialogTitle>
      <FormControl>
        {/** メイン部分 */}
        {/** 期間ラジオグループ */}
        <RadioGroup row>
          <FormControlLabel control={<Radio />} label="1年以内に更新がある" />
          <FormControlLabel control={<Radio />} label="全て" />
          <FormControlLabel control={<Radio />} label="カスタム" />
        </RadioGroup>
      </FormControl>
      {/** 日付選択 */}
      <Stack direction="row">
        <PeriodSelectMenuButton
          year={2025}
          month={5}
          day={4}
          onChangeYear={() => {}}
          onChangeMonth={() => {}}
          onChangeDay={() => {}}
        />
        <Typography>〜</Typography>
        <PeriodSelectMenuButton
          year={2025}
          month={5}
          day={4}
          onChangeYear={() => {}}
          onChangeMonth={() => {}}
          onChangeDay={() => {}}
        />
      </Stack>
      {/** 下部(チェックボックス + ボタン) */}
      <Stack direction="row" justifyContent={"space-between"}>
        {/** 完了込みかのチェックボックス */}
        <FormControlLabel control={<Checkbox />} label="完了済みを除く" />
        <Stack direction="row">
          <Button color="error">キャンセル</Button>
          <Button>適応</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default CategoryDisplayRangeDialog;
