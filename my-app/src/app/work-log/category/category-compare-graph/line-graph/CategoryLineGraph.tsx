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

type Props = {
  /** 表示データ */
  data: ({ date: string } & { [id: number]: number })[];
  /** 表示期間 */
  range: "day" | "week" | "month";
  /** 表示する内容 */
  displayData: "totalHours" | "taskCount";
};
/**
 * カテゴリのタスク稼働率を折れ線グラフで表現するコンポーネント
 */
const CategoryLineGraph = memo(function CategoryLineGraph({
  data,
  range,
  displayData,
}: Props) {
  const { xLabel, yLabel, keyList } = CategoryLineGraphLogic({
    data,
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
      {keyList.map((key) => (
        <Line
          key={key}
          dataKey={key}
          stroke="#8884d8"
          strokeWidth={5}
          style={{ cursor: "pointer" }}
          onClick={() => console.log("aaa")}
        />
      ))}
      <Tooltip />
    </LineChart>
  );
});
export default CategoryLineGraph;
