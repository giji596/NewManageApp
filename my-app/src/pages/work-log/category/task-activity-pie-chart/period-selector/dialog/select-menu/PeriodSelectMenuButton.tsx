import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

/**
 * 期間選択のメニューボタン
 */
export default function PeriodSelectMenuButton() {
  return (
    <>
      <Button>2025/04/22</Button>
      <Menu open={true}>
        <Stack direction={"row"}>
          <FormControl>
            <InputLabel>年</InputLabel>
            <Select label="年" value={"2025年"}>
              <MenuItem value={"2025年"}>2025年</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>月</InputLabel>
            <Select label="月" value={"4月"}>
              <MenuItem value={"4月"}>4月</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>日</InputLabel>
            <Select label="日" value={"22日"}>
              <MenuItem value={"22日"}>22日</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Menu>
    </>
  );
}
