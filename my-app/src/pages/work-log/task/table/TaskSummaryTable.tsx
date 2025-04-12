import { TaskSummary } from "@/type/Task";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import TaskSummaryTableHeader from "./header/TaskSummaryTableHeader";
import TaskSummaryTableBody from "./body/TaskSummaryTableBody";

type Props = {
  /** タスク一覧データ */
  taskList: TaskSummary[];
};

/**
 * タスク一覧ページのテーブル
 */
export default function TaskSummaryTable({ taskList }: Props) {
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TaskSummaryTableHeader
            isFavoriteChecked={false}
            isAsc={false}
            taskCheckList={{}}
            categoryCheckList={{}}
            onClickFavorite={() => {}}
            isSelected={() => false}
            onClickTitle={() => {}}
            onClickSelectTask={() => {}}
            onClickSelectCategory={() => {}}
          />
        </TableHead>
        <TableBody>
          {taskList.map((taskItem) => (
            <TaskSummaryTableBody key={taskItem.id} taskItem={taskItem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
