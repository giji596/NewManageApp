"use client";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import TaskTableHeader from "./DailyDetailTaskTableHeader/TaskTableHeader";
import { DailyDetailTaskTableType } from "@/type/Task";
import TaskTableLogic from "./TaskTableLogic";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";

type Props = {
  /** タスク一覧 */
  taskList: DailyDetailTaskTableType[];
  /** ロード状態か */
  isLoading: boolean;
  /** rowをクリックした際のハンドラー */
  onClickRow: (id: number) => void;
  /** 選択状態のアイテムid */
  selectedItemId: number | null;
};

/**
 * 日付詳細ページのタスクテーブルのコンポーネント
 */
export default function TaskTable({
  taskList,
  isLoading,
  onClickRow,
  selectedItemId,
}: Props) {
  const {
    isAsc,
    taskFilterList,
    categoryFilterList,
    isSelected,
    handleClickSortLabel,
    doSort,
    toggleCategoryFilterCheckBox,
    toggleTaskFilterCheckBox,
    doFilterByFilterList,
  } = TaskTableLogic({ taskList });
  const { handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev } =
    CustomMenuWrapperLogic();
  return (
    <>
      <TableContainer>
        <Table
          sx={{ tableLayout: "fixed", width: "100%", padding: "16px 24px" }}
        >
          <TaskTableHeader
            isAsc={isAsc}
            isSelected={isSelected}
            OnClickTitle={handleClickSortLabel}
            onHoverTitle={handleMouseEnter}
            onLeaveHoverTitle={handleMouseLeave}
          />
          <TableBody>
            {isLoading && <TableBodyLoading colCount={5} />}
            {!isLoading && taskList.length === 0 && (
              <TableBodyNoItem colCount={5} />
            )}
            {!isLoading &&
              taskList.length > 0 &&
              taskList
                .filter((item) => doFilterByFilterList(item))
                .sort(doSort)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => onClickRow(item.id)}
                    selected={item.id === selectedItemId}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {/** タスク名 */}
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.task.name}
                    </TableCell>
                    {/** カテゴリ */}
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.category.name}
                    </TableCell>
                    {/** 稼働時間*/}
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.dailyHours}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** カスタムメニューの面々   */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
        {/** カテゴリメニューの場合 */}
        {openTargetIdRef.current === 10001 && (
          <CustomMenuCheckBox
            checkList={categoryFilterList}
            onClickSelect={toggleCategoryFilterCheckBox}
          />
        )}
        {/** タスクメニューの場合 */}
        {openTargetIdRef.current === 10000 && (
          <CustomMenuCheckBox
            checkList={taskFilterList}
            onClickSelect={toggleTaskFilterCheckBox}
          />
        )}
      </CustomMenuWrapper>
    </>
  );
}
