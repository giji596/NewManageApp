import { CategoryLineGraphDisplay } from "@/type/Category";
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
import { CategoryLineGraphSettingMenuLogic } from "./CategoryLineGraphSettingMenuLogic";

type Props = {
  /** 表示対象 */
  displayTarget: CategoryLineGraphDisplay;
  /** 表示対象変更時のハンドラー */
  onChangeDisplayTarget: (target: CategoryLineGraphDisplay) => void;
};

/**
 * カテゴリ比較グラフの設定メニュー
 */
const CategoryLineGraphSettingMenu = memo(
  function CategoryLineGraphSettingMenu({
    displayTarget,
    onChangeDisplayTarget,
  }: Props) {
    const { handleChangeDisplayTarget } = CategoryLineGraphSettingMenuLogic({
      onChangeDisplayTarget,
    });
    return (
      <>
        <Stack direction="row" width="100vh">
          {/** 左部分(リスト) */}
          <Stack width="30%" height="50vh" border="1px solid">
            <List>
              <ListItem>
                <ListItemButton sx={{ padding: 0 }}>
                  {/** チェックのボタンっぽいところ */}
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      border: "1px solid rgba(26, 26, 26, 0.14)",
                      borderRadius: "50%", // 丸くする
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 8,
                      marginRight: 8,
                      backgroundColor: "transparent", // 選択された場合の背景色
                      transition: "all 0.3s ease", // アニメーションのスムーズさ
                      boxShadow: true // TODO:選択中かどうかをフラグ管理して表示
                        ? "0 0 10px rgba(25, 118, 210, 0.6)"
                        : "none", // 選択時にグラデーションっぽく外側に広がる影
                    }}
                  >
                    {true && ( // TODO:選択中かどうかをフラグ管理して表示
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%", // 中も丸く
                          backgroundColor: "rgb(28, 164, 255)", // チェック部分の色 TODO:項目によって変更
                        }}
                      />
                    )}
                  </div>
                  {/** カテゴリ名 */}
                  aaa
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
          {/** 右部分(表示範囲) */}
          <Stack width="70%" height="18vh" border="1px solid" pl={3} pt={1}>
            {/** Y軸(カウント対象) */}
            <FormControl>
              <FormLabel>表示対象</FormLabel>
              <RadioGroup
                value={displayTarget}
                onChange={handleChangeDisplayTarget}
                row
              >
                <FormControlLabel
                  value="totalHours"
                  control={<Radio />}
                  label="稼働時間"
                />
                <FormControlLabel
                  value="taskCount"
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
      </>
    );
  }
);
export default CategoryLineGraphSettingMenu;
