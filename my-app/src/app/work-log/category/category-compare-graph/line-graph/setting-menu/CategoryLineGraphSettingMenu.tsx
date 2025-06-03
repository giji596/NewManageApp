import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { memo } from "react";

/**
 * カテゴリ比較グラフの設定メニュー
 */
const CategoryLineGraphSettingMenu = memo(
  function CategoryLineGraphSettingMenu() {
    return (
      <Stack direction="row" width="100vh">
        {/** 左部分(リスト) */}
        <Stack width="30%" height="50vh" border="1px solid">
          <List>
            <ListItem>
              <ListItemButton>aaa</ListItemButton>
            </ListItem>
          </List>
        </Stack>
        {/** 右部分(表示範囲) */}
        <Stack width="70%" height="18vh" border="1px solid" pl={3} pt={1}>
          {/** Y軸(カウント対象) */}
          <FormControl>
            <FormLabel>表示対象</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="hour"
                control={<Radio />}
                label="稼働時間"
              />
              <FormControlLabel
                value="task"
                control={<Radio />}
                label="タスク数"
              />
            </RadioGroup>
          </FormControl>
          {/** X軸(日付範囲) */}
          <FormLabel>表示範囲</FormLabel>
          <Button>日付を指定</Button>
        </Stack>
      </Stack>
    );
  }
);
export default CategoryLineGraphSettingMenu;
