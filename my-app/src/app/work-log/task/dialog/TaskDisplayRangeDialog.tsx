import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { memo } from "react";

const TaskDisplayRangeDialog = memo(function TaskDisplayRangeDialog() {
  return (
    <Dialog open={true /** TODO:後々修正 */}>
      {/** 表示設定のラジオボタン */}
      <FormControl sx={{ px: 3, pt: 2 }}>
        <FormLabel id="display-range-label">表示設定</FormLabel>
        <RadioGroup
          aria-labelledby="display-range-label"
          name="display-range"
          row
        >
          <FormControlLabel control={<Radio />} label="進行中" />
          <FormControlLabel control={<Radio />} label="完了済み" />
          <FormControlLabel control={<Radio />} label="カスタム" />
        </RadioGroup>
      </FormControl>
      {/** カスタム設定部分(メインコンテンツ) */}
      <Stack m={1} px={2} py={1} border="1px solid #ccc">
        {/** 進捗 */}
        <Stack>
          {/** 上部(switch/タイトル) */}
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <Switch />
            <Typography id="slider-label">進捗</Typography>
          </Stack>
          {/** フォームエリア */}
          <Stack direction={"row"} spacing={4}>
            <Input
              sx={{ width: 80 }}
              aria-label="min-progress-range"
              name="min-progress-range"
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
              }}
            />
            <Slider
              aria-labelledby="slider-label"
              name="progress-slider"
              value={[30, 70]}
              valueLabelDisplay="auto"
            />
            <Input
              sx={{ width: 80 }}
              aria-label="max-progress-range"
              name="max-progress-range"
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
              }}
            />
          </Stack>
        </Stack>
        {/** 開始日/終了日 */}
        {["startDate", "lastDate"].map((v) => (
          <Stack key={v}>
            {/** 上部(switch/タイトル) */}
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Switch />
              <Typography>{v === "startDate" ? "開始日" : "最終日"}</Typography>
            </Stack>
            {/** フォームエリア */}
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Button aria-label={`min-${v}-range`}>yyyy/mm/dd</Button>
              <Menu
                id={`min-${v}-range-menu`}
                open={false /** TODO:あとで修正 */}
              >
                <Stack direction="row" px={1.5} py={0.5}>
                  {["yyyy", "mm", "dd"].map((v) => (
                    <FormControl key={v}>
                      <Select
                        name="min-date-range-select"
                        aria-label="min-date-range-select"
                        variant="standard"
                        value={v}
                      >
                        <MenuItem value={v}>{v}</MenuItem>
                      </Select>
                    </FormControl>
                  ))}
                </Stack>
              </Menu>
              ~<Button aria-label={`max-${v}-range`}>yyyy/mm/dd</Button>
              <Menu
                id={`max-${v}-range-menu`}
                open={false /** TODO:あとで修正 */}
              >
                <Stack direction="row" px={1.5} py={0.5}>
                  {["yyyy", "mm", "dd"].map((v) => (
                    <FormControl key={v}>
                      <Select
                        name="max-date-range-select"
                        aria-label="min-date-range-select"
                        variant="standard"
                        value={v}
                      >
                        <MenuItem value={v}>{v}</MenuItem>
                      </Select>
                    </FormControl>
                  ))}
                </Stack>
              </Menu>
            </Stack>
          </Stack>
        ))}
      </Stack>
      {/** 下部(稼働なし省くかのチェック/ ボタン群) */}
      <Stack pb={2} px={3} direction="row" justifyContent={"space-between"}>
        {/** 左部分(チェックボックス) */}
        <FormControlLabel
          control={<Checkbox size="small" />}
          label={
            <Typography fontSize="0.8rem">
              稼働記録のないタスクを表示しない
            </Typography>
          }
        />
        {/** 右部分(ボタン) */}
        <Stack direction="row">
          <Button color="error">キャンセル</Button>
          <Button>適応</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default TaskDisplayRangeDialog;
