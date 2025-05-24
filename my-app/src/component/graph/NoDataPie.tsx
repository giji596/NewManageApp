import { useTheme } from "@mui/material/styles";
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
  // MUIテーマ取得
  const theme = useTheme();
  return (
    <svg width={width} height={height}>
      <circle cx="50%" cy="50%" r={radius} fill={theme.palette.gray.light} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fill={theme.palette.text.secondary}
      >
        データがありません
      </text>
    </svg>
  );
});
export default NoDataPieGraph;
