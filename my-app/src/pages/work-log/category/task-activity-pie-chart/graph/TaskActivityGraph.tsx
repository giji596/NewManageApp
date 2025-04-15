import { CategoryTaskActivity } from "@/type/Task";
import { memo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";

type Props = {
  /** データ */
  data: CategoryTaskActivity[];
};

/**
 * 特定の期間のタスク稼働を表現するグラフ
 */
const TaskActivityGraph = memo(function TaskActivityGraph({ data }: Props) {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={[]}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#8884d8"
      />
      <Tooltip />
    </PieChart>
  );
});
export default TaskActivityGraph;
