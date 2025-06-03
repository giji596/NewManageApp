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
  /** 表示データの情報 */
  dataInfo: {
    /** データキー名 */
    key: string;
    /** ツールチップで表示するデータ名 */
    name: string;
    /** 線の色 */
    color: string;
  }[];
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
  dataInfo,
  range,
  displayData,
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
          onClick={() => console.log("aaa")}
        />
      ))}
      <Tooltip />
    </LineChart>
  );
});
export default CategoryLineGraph;
