"use client";
import { memo } from "react";
import TaskActivityGraph from "./graph/TaskActivityGraph";
import PeriodSelector from "./period-selector/PeriodSelector";
import TaskActivityPieChartLogic from "./TaskActivityPieChartLogic";
import { Stack } from "@mui/material";

type Props = {
  /** カテゴリid */
  categoryId: number;
};

/**
 * 設定した期間のタスク稼働率を円グラフで表示するコンポーネント
 */
const TaskActivityPieChart = memo(function TaskActivityPieChart({
  categoryId,
}: Props) {
  const {
    selectedRange,
    onChangeSelectedRange,
    startDate,
    endDate,
    handleSetSelectedRange,
    data,
  } = TaskActivityPieChartLogic({ categoryId });
  return (
    <Stack>
      <PeriodSelector
        selectRange={selectedRange}
        onChangeSelectRange={onChangeSelectedRange}
        startDate={startDate}
        endDate={endDate}
        getDataSelectRange={handleSetSelectedRange}
      />
      <TaskActivityGraph data={data} />
    </Stack>
  );
});
export default TaskActivityPieChart;
