"use client";
import { memo } from "react";
import TaskActivityGraph from "./graph/TaskActivityGraph";
import PeriodSelector from "./period-selector/PeriodSelector";
import TaskActivityPieChartLogic from "./TaskActivityPieChartLogic";
import { CircularProgress, Stack } from "@mui/material";
import NoDataPieGraph from "@/component/graph/NoDataPie";

/**
 * 設定した期間のタスク稼働率を円グラフで表示するコンポーネント
 */
const TaskActivityPieChart = memo(function TaskActivityPieChart() {
  const {
    selectedRange,
    onChangeSelectedRange,
    startDate,
    endDate,
    handleSetSelectedRange,
    data,
    isLoading,
  } = TaskActivityPieChartLogic();
  return (
    <Stack>
      <PeriodSelector
        selectRange={selectedRange}
        onChangeSelectRange={onChangeSelectedRange}
        startDate={startDate}
        endDate={endDate}
        getDataSelectRange={handleSetSelectedRange}
      />
      {isLoading && (
        <Stack
          width={400}
          height={350}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && data.length === 0 && (
        <NoDataPieGraph width={400} height={350} radius={150} />
      )}
      {!isLoading && data.length !== 0 && <TaskActivityGraph data={data} />}
    </Stack>
  );
});
export default TaskActivityPieChart;
