"use client";
import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { memo } from "react";
import CategoryTaskTableHeader from "./header/CategoryTaskTableHeader";
import CategoryTaskTableBody from "./body/CategoryTaskTableBody";
import { CategoryTaskList } from "@/type/Task";
import CategoryTaskTableLogic from "./CategoryTaskTableLogic";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
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
  const {
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    isFavoriteChecked,
    toggleFavoriteCheck,
    navigateToTaskDetail,
  } = CategoryTaskTableLogic();

  const columnsConfig: ColumnConfig<CategoryTaskList>[] = [
    { key: "isFavorite", title: "", width: "10%", labelProp: "favoriteToggle" },
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
  ];
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
