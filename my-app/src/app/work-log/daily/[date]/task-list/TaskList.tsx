"use client";
import { Stack } from "@mui/material";
import TaskTable from "./table/TaskTable";
import TaskMenu from "./task-menu/TaskMenu";
import { DailyDetailTaskTableType } from "@/type/Task";
import TaskListLogic from "./TaskListLogic";
import TaskEditDialog from "./dialog/TaskEditDialog/TaskEditDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
  /** ロード中かどうか */
  isLoading: boolean;
  /** タスクページへ移動する関数 */
  navigateTaskPage: (id: number) => void;
  /** カテゴリページへ移動する関数 */
  navigateCategoryPage: (id: number) => void;
  /** タスクリストのロジック */
  taskListLogic: ReturnType<typeof TaskListLogic>;
};

/**
 * 日付詳細ページのタスク表示部分
 */
export default function TaskList({
  taskList,
  isLoading,
  navigateTaskPage,
  navigateCategoryPage,
  taskListLogic,
}: Props) {
  const {
    selectedItemId,
    isItemSelected,
    selectedItemTaskId,
    selectedItemCategoryId,
    selectedItemHours,
    handleClickRow,
  } = taskListLogic;
  const {
    open: openEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDialog();
  return (
    <>
      <Stack height={400}>
        <TaskMenu
          isActive={isItemSelected}
          onClickEdit={onOpenEdit}
          onClickNavigateTask={() => navigateTaskPage(selectedItemTaskId)}
          onClickNavigateCategory={() =>
            navigateCategoryPage(selectedItemCategoryId)
          }
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
    </>
  );
}
