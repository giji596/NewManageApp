import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { memo } from "react";
import CategoryTaskTableHeader from "./header/CategoryTaskTableHeader";
import CategoryTaskTableBody from "./body/CategoryTaskTableBody";
import { CategoryTaskList } from "@/type/Task";
import CategoryTaskTableLogic from "./CategoryTaskTableLogic";

type Props = {
  /** タスク一覧 */
  taskItemList: CategoryTaskList[];
};

/**
 * カテゴリページのタスク一覧のテーブル
 */
const CategoryTaskTable = memo(function CategoryTaskTable({
  taskItemList,
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
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }} stickyHeader>
        <TableHead>
          <CategoryTaskTableHeader
            isSortTarget={isSelected}
            isAsc={isAsc}
            onClickSortLabel={handleClickSortLabel}
            isFavoriteChecked={isFavoriteChecked}
            onClickFavoriteLabel={toggleFavoriteCheck}
          />
        </TableHead>
        <TableBody>
          {taskItemList.sort(doSort).map((item) => (
            <CategoryTaskTableBody
              key={item.id}
              item={item}
              onClickNavigate={navigateToTaskDetail}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default CategoryTaskTable;
