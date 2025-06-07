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
    <Stack direction="row" px={5} spacing={2}>
      {/** 左側(カテゴリ間) */}
      <Stack width="40%" pt={10}>
        <CategoryCompareGraph />
      </Stack>
      <Divider orientation="vertical" flexItem />
      {/** 右側(カテゴリ詳細) */}
      <Stack alignItems={"center"} width="60%" direction="row">
        {/** 左部(基本情報) */}
        <CategoryHeader />
        {/** 右部(期間グラフ) */}
        <Stack justifyContent={"space-between"} height="70vh" pt={2}>
          <TaskActivityPieChart />
        </Stack>
      </Stack>
    </Stack>
  );
}
