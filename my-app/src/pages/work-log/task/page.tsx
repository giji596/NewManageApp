import TaskSummaryHeader from "./header/TaskSummaryHeader";
import TaskSummaryPageParams from "./params";
import TaskSummaryTable from "./table/TaskSummaryTable";

/**
 * タスク一覧ページ
 */
export default function TaskSummaryPage() {
  const {
    taskSummaryData,
    isLoading,
    rowRefs,
    handleSaveAll,
    handleResetAll,
    onDirtyChange,
    isDirty,
  } = TaskSummaryPageParams();
  return (
    <>
      <TaskSummaryHeader
        isDirty={isDirty}
        isSelected={false}
        onClickSave={handleSaveAll}
        onClickReset={handleResetAll}
        onClickNavigateDetail={() => {}}
      />
      {!isLoading && (
        <TaskSummaryTable
          taskList={taskSummaryData}
          ref={rowRefs.current}
          selectedItemId={0} // TODO
          onClickItemRow={() => {}} // TODO
          onDirtyChange={onDirtyChange}
        />
      )}
    </>
  );
}
