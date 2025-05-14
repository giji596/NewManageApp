"use client";
import { Divider, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import MainPagePieChartLogic from "./MainPagePieChartLogic";
import CustomToolTipWrapper from "@/component/graph/tool-chip/CustomToolTipWrapper";
import CustomToolTipContent from "@/component/graph/tool-chip/CustomToolTipContent";
import NoDataPieGraph from "@/component/graph/NoDataPie";

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
      {data.length === 0 && (
        <NoDataPieGraph width={400} height={300} radius={150} />
      )}
      {data.length !== 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
          />
          <Tooltip
            content={
              <CustomToolTipWrapper>
                {(dataItem: (typeof data)[0]) => (
                  <>
                    <Typography textAlign={"center"}>
                      カテゴリ名:{dataItem.name}
                    </Typography>
                    <Divider />
                    {dataItem.task.map((item, idx) => (
                      <CustomToolTipContent
                        key={idx}
                        name={item.name}
                        value={item.hours}
                      />
                    ))}
                  </>
                )}
              </CustomToolTipWrapper>
            }
          />
        </PieChart>
      )}
    </Stack>
  );
});
export default MainPagePieChart;
