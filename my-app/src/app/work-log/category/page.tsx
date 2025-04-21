"use client";

import { CircularProgress, Stack } from "@mui/material";
import CategorySelect from "./category-select/CategorySelect";
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
import CategoryTaskList from "./category-task-list/CategoryTaskList";
import CategoryPageLogic from "./logic";
import dynamic from "next/dynamic";

/**
 * カテゴリページ
 */
export default function CategoryPage() {
  const { selectedId, onChangeSelectedId } = CategoryPageLogic();
  return (
    <Stack direction="row" p={4}>
      {/** 左側(カテゴリ選択/期間グラフ) */}
      <Stack width="50%" justifyContent={"space-around"}>
        <CategorySelect
          selectedCategoryId={selectedId}
          onChangeCategoryId={onChangeSelectedId}
        />
        <TaskActivityPieChart categoryId={selectedId} />
      </Stack>
      {/** 右側(カテゴリ内タスクリスト) */}
      <Stack width="50%" height={500} pt={10}>
        <CategoryTaskList categoryId={selectedId} />
      </Stack>
    </Stack>
  );
}
