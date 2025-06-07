import { memo } from "react";
import CategoryLineGraphHeader from "./header/CategoryLineGraphHeader";
import CategoryLineGraph from "./line-graph/CategoryLineGraph";
import { Stack, Typography } from "@mui/material";
import { CategoryCompareGraphLogic } from "./CategoryCompareGraphLogic";

/**
 * カテゴリ比較グラフのコンポーネント
 */
const CategoryCompareGraph = memo(function CategoryCompareGraph() {
  const {
    displayTarget,
    onChangeDisplayTarget,
    startDate,
    endDate,
    setDateRange,
    timeUnit,
    categoryFilterList,
    visibleKeys,
    toggleCategoryFilter,
    top3Categories,
    graphData,
    graphDataInfo,
    setCategoryQuery,
  } = CategoryCompareGraphLogic();
  const width = 500;
  return (
    <Stack spacing={2} alignItems={"center"} pt={4}>
      <Typography variant="h6" color="text.secondary">
        カテゴリ間の比較
      </Typography>
      <CategoryLineGraphHeader
        width={width}
        displayTarget={displayTarget}
        onChangeDisplayTarget={onChangeDisplayTarget}
        startDate={startDate}
        endDate={endDate}
        getDataSelectRange={setDateRange}
        categoryFilterList={categoryFilterList ?? {}}
        toggleCategoryFilter={toggleCategoryFilter}
        top3Categories={top3Categories}
      />
      <CategoryLineGraph
        width={width}
        data={graphData}
        dataInfo={graphDataInfo}
        range={timeUnit}
        displayData={displayTarget}
        onClickLine={setCategoryQuery}
        visibleKeys={visibleKeys}
      />
    </Stack>
  );
});
export default CategoryCompareGraph;
