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
      <FormControl>
        <FormLabel>表示設定</FormLabel>
        <RadioGroup row>
          <FormControlLabel control={<Radio />} label="進行中" />
          <FormControlLabel control={<Radio />} label="完了済み" />
          <FormControlLabel control={<Radio />} label="カスタム" />
        </RadioGroup>
      </FormControl>
      {/** カスタム設定部分(メインコンテンツ) */}
      <Stack>
        {/** 進捗 */}
        <Stack>
          {/** 上部(switch/タイトル) */}
          <Stack direction="row">
            <Switch />
            <Typography>進捗</Typography>
          </Stack>
          {/** フォームエリア */}
          <Stack direction={"row"}>
            <Input />
            <Slider />
            <Input />
          </Stack>
        </Stack>
        {/** 開始日/終了日 */}
        {["startDate", "lastDate"].map((v) => (
          <Stack key={v}>
            {/** 上部(switch/タイトル) */}
            <Stack direction="row">
              <Switch />
              <Typography>{v === "startDate" ? "開始日" : "最終日"}</Typography>
            </Stack>
            {/** フォームエリア */}
            <Stack direction={"row"}>
              <Button>yyyy/mm/dd</Button>
              <Menu open={false /** TODO:あとで修正 */}>
                <Stack direction="row">
                  {["yyyy", "mm", "dd"].map((v) => (
                    <FormControl key={v}>
                      <Select>
                        <MenuItem>{v}</MenuItem>
                      </Select>
                    </FormControl>
                  ))}
                </Stack>
              </Menu>
              -<Button>yyyy/mm/dd</Button>
              <Menu open={false /** TODO:あとで修正 */}>
                <Stack direction="row">
                  {["yyyy", "mm", "dd"].map((v) => (
                    <FormControl key={v}>
                      <Select>
                        <MenuItem>{v}</MenuItem>
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
      <Stack direction="row" justifyContent={"space-between"}>
        {/** 左部分(チェックボックス) */}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="稼働記録のないタスクを表示しない"
        />
        {/** 右部分(ボタン) */}
        <Stack direction="row">
          <Button>キャンセル</Button>
          <Button>適応</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default TaskDisplayRangeDialog;
