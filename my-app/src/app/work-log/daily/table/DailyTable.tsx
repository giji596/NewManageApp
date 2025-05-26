"use client";
import { Stack, Typography } from "@mui/material";
import DailyTableLogic from "./logic";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomMenuTitle from "@/component/menu/content/CustomMenuTitle/CustomMenuTitle";
import { memo } from "react";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import { DateSummary } from "@/type/Date";
import { format } from "date-fns";

/**
 * 日付ページのテーブルコンポーネント
 */
const DailyTable = memo(function DailyTable() {
  const {
    itemList,
    isLoading,
    dateToId,
    getMemoTitleArrayById,
    handleNavigateSelectedDay,
  } = DailyTableLogic();
  const { handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev } =
    CustomMenuWrapperLogic();
  const columnsConfig: ColumnConfig<DateSummary & { id: number }>[] = [
    {
      key: "date",
      title: "日付",
      labelProp: "sortable",
      renderCell: (item) => <>{format(item.date, "yyyy-MM-dd")}</>,
    },
    {
      key: "categoryName",
      title: "メインカテゴリ",
      labelProp: "sortableAndFilterable",
    },
    {
      key: "taskName",
      title: "メインタスク",
      labelProp: "sortableAndFilterable",
    },
    {
      key: "memo",
      title: "メモ",
      renderCell: (item) => (
        <Stack
          onMouseEnter={(e) => handleMouseEnter(dateToId(item.date), e)}
          onMouseLeave={() => handleMouseLeave(dateToId(item.date))}
          alignItems="center"
        >
          {item.memo.length > 0 && (
            <>
              <Typography
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {item.memo[0].title}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  opacity: 0.6,
                  fontSize: 20,
                }}
              />
            </>
          )}
        </Stack>
      ),
    },
    { key: "dailyHours", title: "合計稼働時間", labelProp: "sortable" },
  ];
  return (
    <>
      <CustomTable<DateSummary & { id: number }>
        data={itemList}
        columns={columnsConfig}
        stickyHeader
        loading={isLoading}
        initialTarget={"日付"}
        onClickRow={handleNavigateSelectedDay}
      />
      {/** カスタムメニューの面々   */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
        {/** メモの場合 */}
        {typeof openTargetIdRef.current === "number" &&
          ![10000, 10001].includes(openTargetIdRef.current) && (
            <CustomMenuTitle
              titleList={getMemoTitleArrayById(openTargetIdRef.current)}
            />
          )}
      </CustomMenuWrapper>
    </>
  );
});
export default DailyTable;
