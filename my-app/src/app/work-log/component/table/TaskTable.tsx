"use client";
import { IconButton, TableContainer, Typography } from "@mui/material";
import { memo } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TaskTableLogic from "./TaskTableLogic";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import { MainPageTaskTable } from "@/type/Task";

/**
 * メインページのタスクテーブルコンポーネント
 */
const TaskTable = memo(function TaskTable() {
  const { data, isLoading, navigateToDetail } = TaskTableLogic();

  const columnsConfig: ColumnConfig<MainPageTaskTable>[] = [
    {
      key: "name",
      title: "タスク名",
      width: "60%",
    },
    {
      key: "progress",
      title: "進捗",
      width: "30%",
    },
    {
      key: "id",
      title: "",
      width: "10%",
      renderCell: (item) => (
        <IconButton onClick={() => navigateToDetail(item.id)}>
          <DoubleArrowIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <Typography textAlign={"center"} variant="h6" color="text.secondary">
        過去一ヶ月の稼働タスク(進捗順)
      </Typography>
      <TableContainer sx={{ width: 700, height: 300 }}>
        <CustomTable<MainPageTaskTable>
          data={data}
          columns={columnsConfig}
          loading={isLoading}
        />
      </TableContainer>
    </>
  );
});
export default TaskTable;
