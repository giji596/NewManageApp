"use client";
import { IconButton, TableContainer } from "@mui/material";
import { memo, useMemo } from "react";
import { CategoryTaskList } from "@/type/Task";
import CategoryTaskTableLogic from "./CategoryTaskTableLogic";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

type Props = {
  /** タスク一覧 */
  taskItemList: CategoryTaskList[];
  /** タスク一覧のロード状態 */
  isLoading: boolean;
};

/**
 * カテゴリページのタスク一覧のテーブル
 */
const CategoryTaskTable = memo(function CategoryTaskTable({
  taskItemList,
  isLoading,
}: Props) {
  const { navigateToTaskDetail } = CategoryTaskTableLogic();

  const columnsConfig: ColumnConfig<CategoryTaskList>[] = useMemo(
    () => [
      {
        key: "isFavorite",
        title: "",
        width: "10%",
        labelProp: "favoriteToggle",
      },
      { key: "name", title: "タスク名", width: "60%", labelProp: "sortable" },
      {
        key: "progress",
        title: "進捗",
        width: "20%",
        labelProp: "sortable",
        renderCell: (item) => <>{item.progress}%</>,
      },
      {
        key: "id",
        title: "",
        width: "10%",
        renderCell: (item) => (
          <IconButton onClick={() => navigateToTaskDetail(item.id)}>
            <DoubleArrowIcon />
          </IconButton>
        ),
      },
    ],
    [navigateToTaskDetail]
  );
  return (
    <TableContainer>
      <CustomTable
        data={taskItemList}
        columns={columnsConfig}
        loading={isLoading}
        stickyHeader
      />
    </TableContainer>
  );
});
export default CategoryTaskTable;
