import { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * カテゴリのタスク稼働率を折れ線グラフで表現するコンポーネント
 */
const CategoryLineGraph = memo(function CategoryLineGraph() {
  const data = [
    {
      date: "2022-01-01",
      value: 50,
    },
    {
      date: "2022-01-05",
      value: 40,
    },
    {
      date: "2022-01-10",
      value: 30,
    },
    {
      date: "2022-01-15",
      value: 20,
    },
    {
      date: "2022-01-20",
      value: 10,
    },
  ];
  return (
    <LineChart width={500} height={350} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Line
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={5}
        style={{ cursor: "pointer" }}
        onClick={() => console.log("aaa")}
      />
      <Tooltip />
    </LineChart>
  );
});
export default CategoryLineGraph;
