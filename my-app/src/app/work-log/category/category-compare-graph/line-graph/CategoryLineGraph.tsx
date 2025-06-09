import { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CategoryLineGraphLogic } from "./CategoryLineGraphLogic";
import {
  CategoryLineGraphData,
  CategoryLineGraphDataInfo,
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";
import { useThemeColor } from "@/hook/useThemeColor";
import { Stack, Typography } from "@mui/material";

type Props = {
  /** 幅 */
  width: number;
  /** 表示データ */
  data: CategoryLineGraphData[];
  /** 表示データの情報 */
  dataInfo: CategoryLineGraphDataInfo[];
  /** 表示期間 */
  range: CategoryLineGraphRange;
  /** 表示する内容 */
  displayData: CategoryLineGraphDisplay;
  /** 表示するかどうかのキー(key:カテゴリ名 value:表示するか) */
  visibleKeys: Record<string, boolean>;
  /** 線のクリック時のイベント */
  onClickLine: (id: number) => void;
};
/**
 * カテゴリのタスク稼働率を折れ線グラフで表現するコンポーネント
 */
const CategoryLineGraph = memo(function CategoryLineGraph({
  width,
  data,
  dataInfo,
  range,
  displayData,
  visibleKeys,
  onClickLine,
}: Props) {
  const { xLabel, yLabel } = CategoryLineGraphLogic({
    range,
    displayData,
  });
  const {
    getLineGraphThemeColor,
    lineGraphAxisTextColor,
    tooltipBackGroundColor,
    tooltipTextColor,
  } = useThemeColor();
  return (
    <>
      {data.length === 0 && (
        <Stack width={450} height={310} border="1px solid">
          <Typography>データがありません</Typography>
        </Stack>
      )}
      {data.length > 0 && (
        <LineChart width={width} height={350} data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="date"
            label={{
              value: xLabel,
              position: "insideBottomRight",
              offset: 0,
              style: { fill: lineGraphAxisTextColor },
            }}
            tick={{ fill: lineGraphAxisTextColor }}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fill: lineGraphAxisTextColor },
            }}
            tick={{ fill: lineGraphAxisTextColor }}
          />
          {dataInfo.map((info) => (
            <Line
              key={info.key}
              dataKey={info.key}
              name={info.name}
              stroke={getLineGraphThemeColor(info.color)}
              strokeWidth={5}
              style={{ cursor: "pointer" }}
              onClick={() => onClickLine(info.key)}
              hide={!visibleKeys[info.name]}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBackGroundColor,
              color: tooltipTextColor,
            }}
          />
        </LineChart>
      )}
    </>
  );
});
export default CategoryLineGraph;
