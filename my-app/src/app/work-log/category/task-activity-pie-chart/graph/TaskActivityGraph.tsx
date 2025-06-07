"use client";
import { CategoryTaskActivity } from "@/type/Task";
import { memo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import TaskActivityGraphLogic from "./TaskActivityGraphLogic";

type Props = {
  /** データ */
  data: CategoryTaskActivity[];
};

/**
 * 特定の期間のタスク稼働を表現するグラフ
 */
const TaskActivityGraph = memo(function TaskActivityGraph({ data }: Props) {
  const { theme, pieData, toolChipFormatter } = TaskActivityGraphLogic({
    data,
  });
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={pieData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={125}
        fill={theme.palette.recharts.pie.defaultFill}
      />
      <Tooltip formatter={toolChipFormatter} />
    </PieChart>
  );
});
export default TaskActivityGraph;
