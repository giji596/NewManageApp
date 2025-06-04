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
import { CategoryLineGraphDisplay } from "@/type/Category";

type Props = {
  /** 幅 */
  width: number;
  /** 表示対象 */
  displayTarget: CategoryLineGraphDisplay;
  /** 表示対象変更時のハンドラー */
  onChangeDisplayTarget: (target: CategoryLineGraphDisplay) => void;
  /** 開始日 */
  startDate: Date;
  /** 終了日 */
  endDate: Date;
  /** 期間選択のハンドラー */
  getDataSelectRange: (start: Date, end: Date) => void;
  /** カテゴリのフィルター */
  categoryFilterList: Record<string, { checked: boolean; color: string }>;
  /** カテゴリのフィルターを切り替える */
  toggleCategoryFilter: (name: string) => void;
};

/**
 * カテゴリ比較グラフの設定メニューのヘッダー
 */
const CategoryLineGraphHeader = memo(function CategoryLineGraphHeader({
  width,
  displayTarget,
  onChangeDisplayTarget,
  startDate,
  endDate,
  getDataSelectRange,
  categoryFilterList,
  toggleCategoryFilter,
}: Props) {
  const { expanded, handleToggle, dateRangeText, displayTargetText } =
    CategoryLineGraphHeaderLogic({ displayTarget, startDate, endDate });

  return (
    <>
      <Paper sx={{ position: "relative", width: width }}>
        <Stack p={2} spacing={0.5} alignItems={"center"}>
          <Typography>
            {dateRangeText} の {displayTargetText}
          </Typography>
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
          sx={{ position: "absolute", width: width, zIndex: 10 }}
        >
          <Stack width={width}>
            <CategoryLineGraphSettingMenu
              displayTarget={displayTarget}
              onChangeDisplayTarget={onChangeDisplayTarget}
              startDate={startDate}
              endDate={endDate}
              getDataSelectRange={getDataSelectRange}
              categoryFilterList={categoryFilterList}
              toggleCategoryFilter={toggleCategoryFilter}
            />
          </Stack>
        </Collapse>
      </Paper>
    </>
  );
});
export default CategoryLineGraphHeader;
