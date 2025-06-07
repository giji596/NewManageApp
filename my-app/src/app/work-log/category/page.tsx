"use client";

import { CircularProgress, Divider, Stack } from "@mui/material";
import CategoryHeader from "./category-header/CategoryHeader";
const TaskActivityPieChart = dynamic(
  () => import("./task-activity-pie-chart/TaskActivityPieChart"),
  {
    ssr: false,
    loading: () => (
      <Stack
        width={577.5}
        height={397.5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
      </Stack>
    ),
  }
);
const CategoryCompareGraph = dynamic(
  () => import("./category-compare-graph/CategoryCompareGraph"),
  {
    ssr: false,
  }
);
import dynamic from "next/dynamic";

/**
 * カテゴリページ
 */
export default function CategoryPage() {
  return (
    <Stack>
      {/** 上部 */}
      <CategoryHeader />
      <Divider sx={{ width: "95%", alignSelf: "center" }} />
      {/** 下部 */}
      <Stack direction="row" px={4}>
        {/** 下左側(期間グラフ) */}
        <Stack width="50%" justifyContent={"space-around"}>
          <TaskActivityPieChart />
        </Stack>
        {/** 下右側(カテゴリ内タスクリスト) */}
        <Stack width="50%" height={500} pt={10}>
          <CategoryCompareGraph />
        </Stack>
      </Stack>
    </Stack>
  );
}
