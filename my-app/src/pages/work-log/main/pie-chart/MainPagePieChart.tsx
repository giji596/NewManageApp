import { Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";

/**
 * メインページの円グラフ
 */
const MainPagePieChart = memo(function MainPagePieChart() {
  return (
    <Stack alignItems={"center"}>
      <Typography>最近の稼働状況 </Typography>
      <PieChart width={450} height={380}>
        <Pie
          data={[{ name: "1", value: 1000 }]}
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
