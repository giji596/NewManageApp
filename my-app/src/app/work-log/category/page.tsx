"use client";

import { Stack } from "@mui/material";
import CategorySelect from "./category-select/CategorySelect";
import TaskActivityPieChart from "./task-activity-pie-chart/TaskActivityPieChart";
import CategoryTaskList from "./category-task-list/CategoryTaskList";
import CategoryPageLogic from "./logic";

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
