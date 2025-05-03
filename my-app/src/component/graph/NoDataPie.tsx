import { memo } from "react";
import { Pie, PieChart } from "recharts";

type Props = {
  /** 半径 */
  radius: number;
  /** (PieChartの)幅 */
  width: number;
  /*: (PieChartの)高さ */
  height: number;
};

/**
 * データがない場合に表示する円グラフ(要PieChart)
 */
const NoDataPieGraph = memo(function NoDataPieGraph({
  radius,
  width,
  height,
}: Props) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={[{ name: "", value: 1 }]}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={radius}
        fill={"#ccc"}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fill="#666"
      >
        データがありません
      </text>
    </PieChart>
  );
});
export default NoDataPieGraph;
