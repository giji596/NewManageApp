"use client";
import { TaskSummary } from "@/type/Task";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
import TaskSummaryTableHeader from "./header/TaskSummaryTableHeader";
import TaskSummaryTableBody from "./body/TaskSummaryTableBody";
import TaskSummaryTableLogic from "./TaskSummaryTableLogic";
import { memo, RefObject } from "react";
import { TaskSummaryTableBodyHandle } from "./body/TaskSummaryTableBodyLogic";

type Props = {
  /** タスク一覧データ */
  taskList: TaskSummary[];
  /** 選択中のアイテムid */
  selectedItemId: number | null;
  /** アイテム行をクリックした際のハンドラー */
  onClickItemRow: (id: number) => void;
  /** ref値(親で関数を使えるように) */
  ref: Record<number, RefObject<TaskSummaryTableBodyHandle | null>>;
  /** isDirtyの変化の通知を受け取る関数 */
  onDirtyChange: (targetId: number, isDirty: boolean) => void;
};

/**
 * タスク一覧ページのテーブル
 */
const TaskSummaryTable = memo(function TaskSummaryTable({
  taskList,
  selectedItemId,
  onClickItemRow,
  ref,
  onDirtyChange,
}: Props) {
  const {
    isAsc,
    categoryFilterList,
    isFavoriteChecked,
    toggleFavoriteCheck,
    isSelected,
    handleClickSortLabel,
    doSort,
    toggleCategoryFilterCheckBox,
    doFilterByFilterList,
    page,
    rowsPerPage,
    startOfPage,
    endOfPage,
    handleChangePage,
    rows,
    rowCount,
  } = TaskSummaryTableLogic({ taskList });
  return (
    <>
      <TableContainer sx={{ height: `calc(100vh - 180px)` }}>
        <Table sx={{ tableLayout: "fixed" }} stickyHeader>
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
            {rows.slice(startOfPage, endOfPage).map((taskItem) => (
              <TaskSummaryTableBody
                key={taskItem.id}
                taskItem={taskItem}
                ref={ref[taskItem.id]}
                isSelected={selectedItemId === taskItem.id}
                onClickRow={onClickItemRow}
                onDirtyChange={onDirtyChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rowCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[20]} // 固定で20件のみ
      />
    </>
  );
});
export default TaskSummaryTable;
