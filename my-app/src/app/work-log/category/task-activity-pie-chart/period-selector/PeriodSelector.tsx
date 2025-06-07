"use client";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import PeriodSelectDialog from "@/component/dialog/PeriodSelectDialog/PeriodSelectDialog";
import useDialog from "@/hook/useDialog";
import PeriodSelectorLogic from "./PeriodSelectorLogic";
import { CategoryActivityRange } from "@/type/Category";

type Props = {
  /** 選択中の範囲 */
  selectRange: CategoryActivityRange;
  /** 選択中の範囲を変更するハンドラー */
  onChangeSelectRange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** selectRange:"select"時の開始範囲 */
  startDate: Date;
  /** selectRange:"select"時の終了範囲 */
  endDate: Date;
  /** selectRange:"select"時に範囲内のデータを取得する関数*/
  getDataSelectRange: (start: Date, end: Date) => void;
};

/**
 * カテゴリ内のタスクの稼働を表示するグラフの期間を選択するラジオグループ
 */
export default function PeriodSelector({
  selectRange,
  onChangeSelectRange,
  startDate,
  endDate,
  getDataSelectRange,
}: Props) {
  const { open, onClose, onOpen } = useDialog();
  const { selectDateString } = PeriodSelectorLogic({ startDate, endDate });
  return (
    <>
      <Stack direction="row">
        <FormControl>
          <FormLabel id="display-range-label">稼働時間の分布</FormLabel>
          <RadioGroup
            aria-labelledby="display-range-label"
            name="display-range"
            row
            value={selectRange}
            onChange={onChangeSelectRange}
          >
            <FormControlLabel
              value="last-month"
              control={
                <Radio
                  sx={{
                    transform: "scale(0.5)",
                    padding: 0,
                  }}
                />
              }
              label="過去一ヶ月"
              sx={{
                "& .MuiFormControlLabel-label": { color: "text.primary" },
              }}
            />
            <FormControlLabel
              value="all"
              control={
                <Radio
                  sx={{
                    transform: "scale(0.5)",
                    padding: 0,
                  }}
                />
              }
              label="全期間"
              sx={{
                "& .MuiFormControlLabel-label": { color: "text.primary" },
              }}
            />
            <FormControlLabel
              value="select"
              control={
                <Radio
                  sx={{
                    transform: "scale(0.5)",
                    padding: 0,
                  }}
                />
              }
              label={
                <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                  <Typography color="text.primary">選択</Typography>
                  <Button
                    variant="contained"
                    color={"secondary"}
                    sx={{ paddingY: 0, paddingX: 1 }}
                    disabled={selectRange !== "select"}
                    onClick={onOpen}
                  >
                    {selectDateString}
                  </Button>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      {open && (
        <PeriodSelectDialog
          open={open}
          onClose={onClose}
          initialStartDate={startDate}
          initialEndDate={endDate}
          getDataSelectRange={getDataSelectRange}
        />
      )}
    </>
  );
}
