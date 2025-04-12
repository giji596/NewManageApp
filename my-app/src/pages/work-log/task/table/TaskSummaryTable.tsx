import { TaskSummary } from "@/type/Task";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import TaskSummaryTableHeader from "./header/TaskSummaryTableHeader";
import TaskSummaryTableBody from "./body/TaskSummaryTableBody";
import TaskSummaryTableLogic from "./TaskSummaryTableLogic";

type Props = {
  /** タスク一覧データ */
  taskList: TaskSummary[];
};

/**
 * タスク一覧ページのテーブル
 */
export default function TaskSummaryTable({ taskList }: Props) {
  const {
    isAsc,
    categoryFilterList,
    isFavoriteChecked,
    toggleFavoriteCheck,
    isSelected,
    handleClickSortLabel,
    sortFunction,
    toggleCategoryFilterCheckBox,
    doFilterByFilterList,
  } = TaskSummaryTableLogic({ taskList });
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TaskSummaryTableHeader
            isFavoriteChecked={isFavoriteChecked}
            isAsc={isAsc}
            categoryCheckList={categoryFilterList}
            onClickFavorite={toggleFavoriteCheck}
            isSelected={isSelected}
            onClickTitle={handleClickSortLabel}
            onClickSelectCategory={toggleCategoryFilterCheckBox}
          />
        </TableHead>
        <TableBody>
          {taskList
            .filter(doFilterByFilterList)
            .sort((a, b) => sortFunction(a, b))
            .map((taskItem) => (
              <TaskSummaryTableBody key={taskItem.id} taskItem={taskItem} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
