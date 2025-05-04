"use client";
import { memo } from "react";
import CategoryTaskTable from "./table/CategoryTaskTable";
import CategoryTaskListHeader from "./header/CategoryTaskListHeader";
import CategoryTaskListLogic from "./CategoryTaskListLogic";

/**
 * カテゴリのタスク一覧表示コンポーネント
 */
const CategoryTaskList = memo(function CategoryTaskList() {
  const { data, isLoading, selectedValue, onChangeSelectedValue } =
    CategoryTaskListLogic();
  return (
    <>
      <CategoryTaskListHeader
        selectedValue={selectedValue}
        onChange={onChangeSelectedValue}
      />
      <CategoryTaskTable taskItemList={data} isLoading={isLoading} />
    </>
  );
});
export default CategoryTaskList;
