import { Stack } from "@mui/material";
import TaskTable from "./table/TaskTable";
import TaskMenu from "./task-menu/TaskMenu";
import { DailyDetailTaskTableType } from "@/type/Task";

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
  return (
    <>
      <Stack>
        <TaskMenu
          isActive={true}
          onClickEdit={() => {}} // TODO:ダイアログ作ったら修正
          onClickNavigateTask={() => navigateTaskPage(0)} // TODO:後でパラメータ修正
          onClickNavigateCategory={() => navigateCategoryPage(0)} // TODO:後でパラメータ修正
        />
        <TaskTable
          taskList={taskList}
          isLoading={isLoading}
          onClickRow={() => {}} // TODO:ろじっくつくるとき
          selectedItemId={null}
        />
      </Stack>
      {/** TODO:　ここに編集用のダイアログ */}
    </>
  );
}
