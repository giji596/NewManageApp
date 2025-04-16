import { memo } from "react";
import CategoryTaskTable from "./table/CategoryTaskTable";
import CategoryTaskListHeader from "./header/CategoryTaskListHeader";
import { DUMMY_CATEGORY_TASK_LIST } from "@/dummy/category-page";

/**
 * カテゴリのタスク一覧表示コンポーネント
 */
const CategoryTaskList = memo(function CategoryTaskList() {
  return (
    <>
      <CategoryTaskListHeader
        selectedValue={"in-progress"}
        onChange={() => {}}
      />
      <CategoryTaskTable taskItemList={DUMMY_CATEGORY_TASK_LIST} />
    </>
  );
});
export default CategoryTaskList;
