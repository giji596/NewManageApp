import { memo } from "react";
import CategoryLineGraphHeader from "./header/CategoryLineGraphHeader";
import CategoryLineGraph from "./line-graph/CategoryLineGraph";
import { Stack } from "@mui/material";
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
    toggleCategoryFilter,
    top3Categories,
    graphData,
    graphDataInfo,
  } = CategoryCompareGraphLogic();
  const width = 500;
  return (
    <Stack spacing={2}>
      <CategoryLineGraphHeader
        width={width}
        displayTarget={displayTarget}
        onChangeDisplayTarget={onChangeDisplayTarget}
        startDate={startDate}
        endDate={endDate}
        getDataSelectRange={setDateRange}
        categoryFilterList={categoryFilterList ?? {}} // TODO:　とりあえずnull時に{}を与える形式で(実際どうするか考える)
        toggleCategoryFilter={toggleCategoryFilter}
        top3Categories={top3Categories}
      />
      <CategoryLineGraph
        width={width}
        data={graphData}
        dataInfo={graphDataInfo}
        range={timeUnit}
        displayData={displayTarget}
        onClickLine={() => {}}
      />
    </Stack>
  );
});
export default CategoryCompareGraph;
