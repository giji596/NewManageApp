import TaskSummaryHeader from "./header/TaskSummaryHeader";
import TaskSummaryPageParams from "./params";
import TaskSummaryTable from "./table/TaskSummaryTable";

/**
 * タスク一覧ページ
 */
export default function TaskSummaryPage() {
  const { taskSummaryData, isLoading } = TaskSummaryPageParams();
  return (
    <>
      <TaskSummaryHeader
        isDirty={false}
        isSelected={false}
        onClickSave={() => {}}
        onClickReset={() => {}}
        onClickNavigateDetail={() => {}}
      />
      {!isLoading && <TaskSummaryTable taskList={taskSummaryData} />}
    </>
  );
}
