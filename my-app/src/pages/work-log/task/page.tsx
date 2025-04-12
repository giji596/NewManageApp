import TaskSummaryHeader from "./header/TaskSummaryHeader";
import TaskSummaryPageParams from "./params";
import TaskSummaryTable from "./table/TaskSummaryTable";

/**
 * タスク一覧ページ
 */
export default function TaskSummaryPage() {
  const { taskSummaryData, isLoading, onDirtyChange, isDirty } =
    TaskSummaryPageParams();
  return (
    <>
      <TaskSummaryHeader
        isDirty={isDirty}
        isSelected={false}
        onClickSave={() => {}}
        onClickReset={() => {}}
        onClickNavigateDetail={() => {}}
      />
      {!isLoading && (
        <TaskSummaryTable
          taskList={taskSummaryData}
          onDirtyChange={onDirtyChange}
        />
      )}
    </>
  );
}
