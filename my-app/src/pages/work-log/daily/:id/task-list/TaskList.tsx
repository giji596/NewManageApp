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
};

/**
 * 日付詳細ページのタスク表示部分
 */
export default function TaskList({
  taskList,
  isLoading,
  navigateTaskPage,
  navigateCategoryPage,
}: Props) {
  const {
    selectedItemId,
    isItemSelected,
    selectedItemTaskId,
    selectedItemCategoryId,
    handleClickRow,
  } = TaskListLogic({
    taskList,
  });
  const { open, onClose, onOpen } = useDialog();
  return (
    <>
      <Stack>
        <TaskMenu
          isActive={isItemSelected}
          onClickEdit={onOpen}
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
      {open &&
        selectedItemId !== null && ( // open=> アンマウントさせて開くたびに初期値を取得させるため
          // selectedItemId => 親ではnull許容 子ではしていないので nullチェック
          <TaskEditDialog
            itemId={selectedItemId}
            initialCategoryId={selectedItemCategoryId}
            initialTaskId={selectedItemTaskId}
            open={open}
            onClose={onClose}
          />
        )}
    </>
  );
}
