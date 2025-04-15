import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { memo } from "react";
import CategoryTaskTableHeader from "./header/CategoryTaskTableHeader";
import CategoryTaskTableBody from "./body/CategoryTaskTableBody";
import { CategoryTaskList } from "@/type/Task";

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
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }} stickyHeader>
        <TableHead>
          <CategoryTaskTableHeader
            isSortTarget={() => false}
            isAsc={false}
            onClickSortLabel={() => {}}
            isFavoriteChecked={false}
            onClickFavoriteLabel={() => {}}
          />
        </TableHead>
        <TableBody>
          {taskItemList.map((item) => (
            <CategoryTaskTableBody
              key={item.id}
              isFavorite={item.isFavorite}
              taskName={item.name}
              progress={item.progress}
              taskId={item.id}
              onClickNavigate={() => {}}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default CategoryTaskTable;
