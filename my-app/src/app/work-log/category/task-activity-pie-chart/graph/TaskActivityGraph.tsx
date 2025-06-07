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
    <PieChart width={350} height={350}>
      <Pie
        data={pieData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill={theme.palette.recharts.pie.defaultFill}
      />
      <Tooltip formatter={toolChipFormatter} />
    </PieChart>
  );
});
export default TaskActivityGraph;
