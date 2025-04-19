import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

/**
 * メインページのタスクテーブルコンポーネント
 */
const TaskTable = memo(function TaskTable() {
  const data = [
    { id: 1, name: "タスク1", progress: "80%" },
    { id: 2, name: "タスク2", progress: "80%" },
    { id: 3, name: "タスク3", progress: "70%" },
    { id: 4, name: "タスク4", progress: "65%" },
    { id: 5, name: "タスク5", progress: "20%" },
  ];
  return (
    <TableContainer sx={{ width: 600, height: 400 }}>
      <Table stickyHeader sx={{ tableLayout: "fixed" }}>
        {/** ヘッダー */}
        <TableHead>
          <TableRow>
            {/** タスク名 */}
            <TableCell width={"60%"}>タスク名</TableCell>
            {/** 進捗 */}
            <TableCell width={"30%"}>進捗</TableCell>
            {/** ボタン部分 */}
            <TableCell width={"10%"}></TableCell>
          </TableRow>
        </TableHead>
        {/** ボディ */}
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {/** タスク名 */}
              <TableCell>{item.name}</TableCell>
              {/** 進捗 */}
              <TableCell>{item.progress}</TableCell>
              {/** ボタン部分 */}
              <TableCell>
                <IconButton>
                  <DoubleArrowIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default TaskTable;
