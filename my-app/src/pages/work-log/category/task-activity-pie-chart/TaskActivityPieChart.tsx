import { memo } from "react";
import TaskActivityGraph from "./graph/TaskActivityGraph";
import PeriodSelector from "./period-selector/PeriodSelector";
import TaskActivityPieChartLogic from "./TaskActivityPieChartLogic";

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
  const { data } = TaskActivityPieChartLogic({ categoryId });
  return (
    <>
      <PeriodSelector
        selectRange={"last-month"}
        onChangeSelectRange={() => {}}
        startDate={new Date("2025-03-14")}
        endDate={new Date("2025-04-14")}
        getDataSelectRange={() => {}}
      />
      <TaskActivityGraph data={data} />
    </>
  );
});
export default TaskActivityPieChart;
