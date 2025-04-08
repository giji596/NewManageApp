import { PieChart, Pie, Tooltip } from "recharts";
import CircleGraphToolChip from "./tool-chip/CircleGraphToolChip";
import { DailyCategoryCircleGraph } from "@/type/Date";

type Props = {
  /** データ */
  data: DailyCategoryCircleGraph[];
};

/**
 * 日付詳細 - 円グラフコンポーネント
 */
export default function CircleGraph({ data }: Props) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
        label={({ name, percent }) =>
          `${name} (${(percent * 100).toFixed(1)}%)`
        }
      />
      <Tooltip content={<CircleGraphToolChip />} />
    </PieChart>
  );
}
