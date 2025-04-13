import { TaskSummary } from "@/type/Task";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import TaskSummaryTableHeader from "./header/TaskSummaryTableHeader";
import TaskSummaryTableBody from "./body/TaskSummaryTableBody";
import TaskSummaryTableLogic from "./TaskSummaryTableLogic";
import { RefObject } from "react";
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
export default function TaskSummaryTable({
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
  );
}
