import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo } from "react";

/**
 * メインページのタスクテーブルコンポーネント
 */
const TaskTable = memo(function TaskTable() {
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
          <TableRow>
            {/** タスク名 */}
            <TableCell>タスク名</TableCell>
            {/** 進捗 */}
            <TableCell>進捗</TableCell>
            {/** ボタン部分 */}
            <TableCell>ボタン</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default TaskTable;
