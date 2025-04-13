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
    selectedItemId,
    handleSelectItem,
    isAnyItemSelected,
  } = TaskSummaryPageParams();
  return (
    <>
      <TaskSummaryHeader
        isDirty={isDirty}
        isSelected={isAnyItemSelected}
        onClickSave={handleSaveAll}
        onClickReset={handleResetAll}
        onClickNavigateDetail={() => {}}
      />
      {!isLoading && (
        <TaskSummaryTable
          taskList={taskSummaryData}
          ref={rowRefs.current}
          selectedItemId={selectedItemId}
          onClickItemRow={handleSelectItem}
          onDirtyChange={onDirtyChange}
        />
      )}
    </>
  );
}
