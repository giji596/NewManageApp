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
import PeriodSelectDialog from "./dialog/PeriodSelectDialog";
import useDialog from "@/hook/useDialog";
import PeriodSelectorLogic from "./PeriodSelectorLogic";

type Props = {
  /** 選択中の範囲 */
  selectRange: "last-month" | "all" | "select";
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
          <FormLabel>表示期間</FormLabel>
          <RadioGroup
            row
            sx={{ gap: 2 }}
            value={selectRange}
            onChange={onChangeSelectRange}
          >
            <FormControlLabel
              value="last-month"
              control={<Radio />}
              label="過去一ヶ月"
            />
            <FormControlLabel value="all" control={<Radio />} label="全期間" />
            <FormControlLabel
              value="select"
              control={<Radio />}
              label={
                <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                  <Typography>期間を選択する</Typography>
                  <Button
                    variant="contained"
                    color={"secondary"}
                    sx={{ paddingY: 0, paddingX: 1 }}
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
