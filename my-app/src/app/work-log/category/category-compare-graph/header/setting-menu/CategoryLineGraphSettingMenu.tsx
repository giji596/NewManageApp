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
  Typography,
} from "@mui/material";
import { memo } from "react";
import { CategoryLineGraphSettingMenuLogic } from "./CategoryLineGraphSettingMenuLogic";
import PeriodSelectDialog from "@/component/dialog/PeriodSelectDialog/PeriodSelectDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** 表示対象 */
  displayTarget: CategoryLineGraphDisplay;
  /** 表示対象変更時のハンドラー */
  onChangeDisplayTarget: (target: CategoryLineGraphDisplay) => void;
  /** 表示範囲の開始日 */
  startDate: Date;
  /** 表示範囲の終了日 */
  endDate: Date;
  /** 表示範囲を反映する関数 */
  getDataSelectRange: (start: Date, end: Date) => void;
  /** カテゴリのフィルターリスト */
  categoryFilterList: Record<string, { checked: boolean; color: string }>;
  /** フィルターリストを切り替える関数 */
  toggleCategoryFilter: (name: string) => void;
};

/**
 * カテゴリ比較グラフの設定メニュー
 */
const CategoryLineGraphSettingMenu = memo(
  function CategoryLineGraphSettingMenu({
    displayTarget,
    onChangeDisplayTarget,
    startDate,
    endDate,
    getDataSelectRange,
    categoryFilterList,
    toggleCategoryFilter,
  }: Props) {
    const {
      handleChangeDisplayTarget,
      startDateString,
      endDateString,
      visibleCount,
      maxVisibleCount,
    } = CategoryLineGraphSettingMenuLogic({
      onChangeDisplayTarget,
      startDate,
      endDate,
      categoryFilterList,
    });
    const { open, onClose, onOpen } = useDialog();
    return (
      <>
        <Stack direction="row">
          {/** 左部分(リスト) */}
          <Stack
            width="30%"
            height="50vh"
            boxShadow={2}
            sx={{
              bgcolor: "white",
              opacity: 0.8,
            }}
          >
            <Typography
              color="text.secondary"
              pt={2}
              pl={4}
              sx={{ cursor: "default" }}
            >
              表示数 {visibleCount}/{maxVisibleCount}
            </Typography>
            <List sx={{ overflow: "auto" }}>
              {Object.entries(categoryFilterList)
                .sort(
                  ([, a], [, b]) =>
                    a.checked === b.checked ? 0 : a.checked ? -1 : 1 // チェック対象を優先
                )
                .map(([name, value]) => (
                  <ListItem key={name}>
                    <ListItemButton
                      sx={{ padding: 0 }}
                      onClick={() => toggleCategoryFilter(name)}
                    >
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
                          boxShadow: value.checked
                            ? "0 0 10px rgba(25, 118, 210, 0.6)"
                            : "none", // 選択時にグラデーションっぽく外側に広がる影
                        }}
                      >
                        {value.checked && (
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%", // 中も丸く
                              backgroundColor: value.color, // チェック部分の色
                            }}
                          />
                        )}
                      </div>
                      {/** カテゴリ名 */}
                      {name}
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Stack>
          {/** 右部分(表示範囲) */}
          <Stack
            width="70%"
            height="18vh"
            boxShadow={2}
            pl={3}
            pt={1}
            sx={{
              bgcolor: "white",
              opacity: 0.8,
            }}
          >
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
            <Button onClick={onOpen}>
              {startDateString} ~ {endDateString}
            </Button>
          </Stack>
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
);
export default CategoryLineGraphSettingMenu;
