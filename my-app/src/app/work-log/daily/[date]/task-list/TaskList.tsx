"use client";
import { Stack } from "@mui/material";
import TaskTable from "./table/TaskTable";
import TaskMenu from "./task-menu/TaskMenu";
import TaskListLogic from "./TaskListLogic";
import TaskEditDialog from "./dialog/TaskEditDialog/TaskEditDialog";
import useDialog from "@/hook/useDialog";
import CompletedTaskEditDialog from "./dialog/CompletedTaskEditDialog/CompletedTaskEditDialog";

type Props = {
  /** 選択中のアイテムID */
  selectedItemId: number | null;
  /** アイテム行をクリックした際のハンドラー */
  handleClickRow: (id: number) => void;
};

/**
 * 日付詳細ページのタスク表示部分
 */
export default function TaskList({ selectedItemId, handleClickRow }: Props) {
  const {
    taskList,
    isLoading,
    isItemSelected,
    selectedItemTaskId,
    selectedItemCategoryId,
    selectedItemHours,
    isSelectedTaskCompleted,
    selectedTaskName,
    selectedCategoryName,
    navigateTaskPage,
    navigateCategoryPage,
  } = TaskListLogic({
    selectedItemId,
  });
  const {
    open: openEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDialog();
  const {
    open: openEditCompleted,
    onClose: onCloseEditCompleted,
    onOpen: onOpenEditCompleted,
  } = useDialog();
  return (
    <>
      <Stack height={400}>
        <TaskMenu
          isActive={isItemSelected}
          onClickEdit={
            isSelectedTaskCompleted ? onOpenEditCompleted : onOpenEdit
          }
          onClickNavigateTask={navigateTaskPage}
          onClickNavigateCategory={navigateCategoryPage}
        />
        <TaskTable
          taskList={taskList}
          isLoading={isLoading}
          onClickRow={handleClickRow}
          selectedItemId={selectedItemId}
        />
      </Stack>
      {openEdit &&
        selectedItemId !== null && ( // open=> アンマウントさせて開くたびに初期値を取得させるため
          // selectedItemId => 親ではnull許容 子ではしていないので nullチェック
          <TaskEditDialog
            itemId={selectedItemId}
            initialCategoryId={selectedItemCategoryId}
            initialTaskId={selectedItemTaskId}
            initialHours={selectedItemHours}
            open={openEdit}
            onClose={onCloseEdit}
          />
        )}
      {openEditCompleted && selectedItemId !== null && (
        <CompletedTaskEditDialog
          open={openEditCompleted}
          onClose={onCloseEditCompleted}
          itemId={selectedItemId}
          categoryName={selectedCategoryName}
          taskName={selectedTaskName}
          initialHours={selectedItemHours}
        />
      )}
    </>
  );
}
