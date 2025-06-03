import { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CategoryLineGraphLogic } from "../CategoryLineGraphLogic";
import {
  CategoryLineGraphData,
  CategoryLineGraphDataInfo,
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";

type Props = {
  /** 表示データ */
  data: CategoryLineGraphData[];
  /** 表示データの情報 */
  dataInfo: CategoryLineGraphDataInfo[];
  /** 表示期間 */
  range: CategoryLineGraphRange;
  /** 表示する内容 */
  displayData: CategoryLineGraphDisplay;
  /** 線のクリック時のイベント */
  onClickLine: (id: number) => void;
};
/**
 * カテゴリのタスク稼働率を折れ線グラフで表現するコンポーネント
 */
const CategoryLineGraph = memo(function CategoryLineGraph({
  data,
  dataInfo,
  range,
  displayData,
  onClickLine,
}: Props) {
  const { xLabel, yLabel } = CategoryLineGraphLogic({
    range,
    displayData,
  });
  return (
    <LineChart width={500} height={350} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis
        dataKey="date"
        label={{ value: xLabel, position: "insideBottomRight", offset: 0 }}
      />
      <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
      {dataInfo.map((info) => (
        <Line
          key={info.key}
          dataKey={info.key}
          name={info.name}
          stroke={info.color}
          strokeWidth={5}
          style={{ cursor: "pointer" }}
          onClick={() => onClickLine(info.key)}
        />
      ))}
      <Tooltip />
    </LineChart>
  );
});
export default CategoryLineGraph;
