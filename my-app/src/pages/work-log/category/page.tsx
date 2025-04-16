import { Stack } from "@mui/material";
import CategorySelect from "./category-select/CategorySelect";
import TaskActivityPieChart from "./task-activity-pie-chart/TaskActivityPieChart";
import CategoryTaskList from "./category-task-list/CategoryTaskList";

/**
 * カテゴリページ
 */
export default function CategoryPage() {
  return (
    <Stack direction="row" p={1.5}>
      {/** 左側(カテゴリ選択/期間グラフ) */}
      <Stack width="50%" justifyContent={"space-around"}>
        <CategorySelect selectedCategoryId={1} onChangeCategoryId={() => {}} />
        <TaskActivityPieChart categoryId={1} />
      </Stack>
      {/** 右側(カテゴリ内タスクリスト) */}
      <Stack width="50%" height={500} pt={15}>
        <CategoryTaskList categoryId={1} />
      </Stack>
    </Stack>
  );
}
