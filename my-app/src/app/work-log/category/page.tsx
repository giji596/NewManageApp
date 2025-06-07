"use client";

import { CircularProgress, Divider, Stack } from "@mui/material";
import CategoryPanel from "./category-panel/CategoryPanel";
const TaskActivityPieChart = dynamic(
  () => import("./task-activity-pie-chart/TaskActivityPieChart"),
  {
    ssr: false,
    loading: () => (
      <Stack
        width={300}
        height={300}
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
import CategoryTaskList from "./category-task-list/CategoryTaskList";

/**
 * カテゴリページ
 */
export default function CategoryPage() {
  return (
    <Stack direction="row" px={5} spacing={2} pt={2}>
      {/** 左側(カテゴリ間) */}
      <Stack width="40%">
        <CategoryCompareGraph />
      </Stack>
      <Divider orientation="vertical" flexItem />
      {/** 右側(カテゴリ詳細) */}
      <Stack width="60%">
        <Stack direction="row">
          {/** 左部(基本情報) */}
          <CategoryPanel />
          {/** 右部(期間グラフ) */}
          <Stack justifyContent={"space-between"} pt={2}>
            <TaskActivityPieChart />
          </Stack>
        </Stack>
        <Stack height={"40vh"}>
          <CategoryTaskList />
        </Stack>
      </Stack>
    </Stack>
  );
}
