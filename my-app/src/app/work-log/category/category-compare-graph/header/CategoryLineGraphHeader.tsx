import {
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryLineGraphSettingMenu from "./setting-menu/CategoryLineGraphSettingMenu";
import { CategoryLineGraphHeaderLogic } from "./CategoryLineGraphHeaderLogic";

/**
 * カテゴリ比較グラフの設定メニューのヘッダー
 */
const CategoryLineGraphHeader = memo(function CategoryLineGraphHeader() {
  const { expanded, handleToggle, paperWidth } = CategoryLineGraphHeaderLogic();

  return (
    <>
      <Paper sx={{ position: "relative", width: paperWidth }}>
        <Stack p={2} spacing={0.5} alignItems={"center"}>
          <Typography>期間中の稼働時間orタスクの多い順</Typography>
          <Divider flexItem />
          <Typography pt={1}>1位 カテゴリ1 x時間</Typography>
          <Typography>2位 カテゴリ2 x時間</Typography>
          <Typography>3位 カテゴリ3 x時間</Typography>
        </Stack>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            bottom: 5,
          }}
          onClick={handleToggle}
        >
          <SettingsIcon />
        </IconButton>
        <Collapse
          in={expanded}
          sx={{ position: "absolute", width: paperWidth, zIndex: 10 }}
        >
          <Stack width={paperWidth}>
            <CategoryLineGraphSettingMenu
              displayTarget="totalHours"
              onChangeDisplayTarget={() => {}}
              startDate={new Date()}
              endDate={new Date()}
              getDataSelectRange={() => {}}
              categoryFilterList={{}}
              toggleCategoryFilter={() => {}}
            />
          </Stack>
        </Collapse>
      </Paper>
    </>
  );
});
export default CategoryLineGraphHeader;
