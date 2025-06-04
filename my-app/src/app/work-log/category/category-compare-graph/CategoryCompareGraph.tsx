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
        categoryFilterList={{ カテゴリ1: { checked: true, color: "red" } }}
        toggleCategoryFilter={() => {}}
        top3Categories={[
          { id: 1, name: "カテゴリ1", color: "red", value: 100 },
        ]}
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
