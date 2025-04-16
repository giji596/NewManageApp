import { memo } from "react";
import CategoryTaskTable from "./table/CategoryTaskTable";
import CategoryTaskListHeader from "./header/CategoryTaskListHeader";
import CategoryTaskListLogic from "./CategoryTaskListLogic";

type Props = {
  /** カテゴリid */
  categoryId: number;
};

/**
 * カテゴリのタスク一覧表示コンポーネント
 */
const CategoryTaskList = memo(function CategoryTaskList({ categoryId }: Props) {
  const { data } = CategoryTaskListLogic({ categoryId });
  return (
    <>
      <CategoryTaskListHeader
        selectedValue={"in-progress"}
        onChange={() => {}}
      />
      <CategoryTaskTable taskItemList={data} />
    </>
  );
});
export default CategoryTaskList;
