import { memo } from "react";
import CategoryLineGraphHeader from "./header/CategoryLineGraphHeader";
import CategoryLineGraph from "./line-graph/CategoryLineGraph";
import { Stack } from "@mui/material";

/**
 * カテゴリ比較グラフのコンポーネント
 */
const CategoryCompareGraph = memo(function CategoryCompareGraph() {
  const width = 500;
  return (
    <Stack spacing={2}>
      <CategoryLineGraphHeader
        width={width}
        displayTarget="totalHours"
        onChangeDisplayTarget={() => {}}
        startDate={new Date("2022-01-01")}
        endDate={new Date("2022-01-31")}
        getDataSelectRange={() => {}}
        categoryFilterList={{ カテゴリ1: { checked: true, color: "red" } }}
        toggleCategoryFilter={() => {}}
        top3Categories={[
          { id: 1, name: "カテゴリ1", color: "red", value: 100 },
        ]}
      />
      <CategoryLineGraph
        width={width}
        data={[
          { date: "2022-01-01", 1: 50 },
          { date: "2022-01-05", 1: 40 },
          { date: "2022-01-10", 1: 30 },
          { date: "2022-01-15", 1: 20 },
          { date: "2022-01-20", 1: 10 },
        ]}
        dataInfo={[{ key: 1, name: " ", color: "red" }]}
        range="day"
        displayData="totalHours"
        onClickLine={() => {}}
      />
    </Stack>
  );
});
export default CategoryCompareGraph;
