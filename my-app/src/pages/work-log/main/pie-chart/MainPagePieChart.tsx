import { Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import MainPagePieChartLogic from "./MainPagePieChartLogic";

/**
 * メインページの円グラフ
 */
const MainPagePieChart = memo(function MainPagePieChart() {
  const { data } = MainPagePieChartLogic();
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h6" mb={2} color="text.secondary">
        過去一ヶ月のタスク稼働
      </Typography>
      <PieChart width={450} height={350}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={170}
          fill="#8884d8"
        />
        <Tooltip />
      </PieChart>
    </Stack>
  );
});
export default MainPagePieChart;
