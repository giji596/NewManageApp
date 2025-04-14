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

/**
 * カテゴリ内のタスクの稼働を表示するグラフの期間を選択するラジオグループ
 */
export default function PeriodSelector() {
  return (
    <>
      <Stack direction="row">
        <FormControl>
          <FormLabel>表示期間</FormLabel>
          <RadioGroup row sx={{ gap: 2 }}>
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
                    onClick={() => {
                      console.log("ダイアログを開く"); // TODO:
                    }}
                  >
                    {/** TODO:ここで表示する期間は設定した期間 */}
                    2024/12/30 〜 2025/02/22
                  </Button>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      {/**　TODO:ここで期間選択するダイアログ開く */}
    </>
  );
}
