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
    <Stack direction="row">
      {/** 左側(カテゴリ間) */}
      <Stack width="50%" height={500} pt={10}>
        <CategoryCompareGraph />
      </Stack>
      <Divider orientation="vertical" flexItem />
      {/** 右側(カテゴリ詳細) */}
      <Stack>
        {/** 上部 */}
        <CategoryHeader />
        <Divider sx={{ width: "95%", alignSelf: "center" }} />
        {/** 下部(期間グラフ) */}
        <Stack width="50%" justifyContent={"space-around"}>
          <TaskActivityPieChart />
        </Stack>
      </Stack>
    </Stack>
  );
}
