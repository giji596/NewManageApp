import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TaskTableLogic from "./TaskTableLogic";

/**
 * メインページのタスクテーブルコンポーネント
 */
const TaskTable = memo(function TaskTable() {
  const { data, navigateToDetail } = TaskTableLogic();
  return (
    <>
      <Typography textAlign={"center"} variant="h6" color="text.secondary">
        過去一ヶ月の稼働タスク(進捗順)
      </Typography>
      <TableContainer sx={{ width: 600, height: 300 }}>
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          {/** ヘッダー */}
          <TableHead>
            <TableRow>
              {/** タスク名 */}
              <TableCell width={"60%"} sx={{ py: 1 }}>
                タスク名
              </TableCell>
              {/** 進捗 */}
              <TableCell width={"30%"} sx={{ py: 1 }}>
                進捗
              </TableCell>
              {/** ボタン部分 */}
              <TableCell width={"10%"} sx={{ py: 1 }}></TableCell>
            </TableRow>
          </TableHead>
          {/** ボディ */}
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {/** タスク名 */}
                <TableCell sx={{ py: 1 }}>{item.name}</TableCell>
                {/** 進捗 */}
                <TableCell sx={{ py: 1 }}>{item.progress}</TableCell>
                {/** ボタン部分 */}
                <TableCell sx={{ py: 1 }}>
                  <IconButton onClick={() => navigateToDetail(item.id)}>
                    <DoubleArrowIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});
export default TaskTable;
