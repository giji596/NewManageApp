import { memo } from "react";

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
    <svg width={width} height={height}>
      <circle cx="50%" cy="50%" r={radius} fill="#ccc" />
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
    </svg>
  );
});
export default NoDataPieGraph;
