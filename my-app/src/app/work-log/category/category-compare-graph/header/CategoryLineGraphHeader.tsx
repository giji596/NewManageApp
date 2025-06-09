import {
  CircularProgress,
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
import {
  CategoryCompareGraphData,
  CategoryLineGraphDisplay,
} from "@/type/Category";
import { useThemeColor } from "@/hook/useThemeColor";

type Props = {
  /** ロード状態 */
  isLoading: boolean;
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
  /** トップ3のカテゴリ */
  top3Categories: CategoryCompareGraphData[];
};

/**
 * カテゴリ比較グラフの設定メニューのヘッダー
 */
const CategoryLineGraphHeader = memo(function CategoryLineGraphHeader({
  isLoading,
  width,
  displayTarget,
  onChangeDisplayTarget,
  startDate,
  endDate,
  getDataSelectRange,
  categoryFilterList,
  toggleCategoryFilter,
  top3Categories,
}: Props) {
  const {
    expanded,
    handleToggle,
    dateRangeText,
    displayTargetText,
    getCategoryText,
  } = CategoryLineGraphHeaderLogic({
    displayTarget,
    startDate,
    endDate,
  });
  const { getLineGraphThemeColor } = useThemeColor();

  return (
    <>
      {isLoading && (
        <Paper
          sx={{
            width: width,
            height: 145,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CircularProgress />
        </Paper>
      )}
      {!isLoading && (
        <Paper sx={{ position: "relative", width: width }}>
          <Stack p={2} spacing={0.5} alignItems={"center"}>
            <Typography>
              {dateRangeText} の {displayTargetText}
            </Typography>
            <Divider flexItem />
            {/** とっぷ3のカテゴリ*/}
            <Stack pt={1} height={80}>
              {top3Categories.length === 0 && (
                <Typography height="100%" alignContent={"center"}>
                  カテゴリがありません
                </Typography>
              )}
              {top3Categories.length > 0 &&
                top3Categories.map((v, idx) => (
                  <Stack
                    key={v.id}
                    alignItems={"center"}
                    spacing={3}
                    direction="row"
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%", // 中も丸く
                        backgroundColor: getLineGraphThemeColor(v.color), // チェック部分の色
                      }}
                    />
                    <Typography>{getCategoryText(v, idx + 1)}</Typography>
                  </Stack>
                ))}
            </Stack>
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
      )}
    </>
  );
});
export default CategoryLineGraphHeader;
