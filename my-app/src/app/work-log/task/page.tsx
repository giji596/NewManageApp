"use client";

import TaskSummaryHeader from "./header/TaskSummaryHeader";
import useTaskSummaryPage from "./useTaskSummaryPage";
import TaskSummaryTable from "./table/TaskSummaryTable";

/**
 * タスク一覧ページ
 */
export default function TaskSummaryPage() {
  const {
    taskSummaryData,
    isLoading,
    isValidating,
    rowRefs,
    handleSaveAll,
    handleResetAll,
    onDirtyChange,
    isDirty,
    selectedItemId,
    handleSelectItem,
    isAnyItemSelected,
    navigateToDetail,
  } = useTaskSummaryPage();
  return (
    <>
      <TaskSummaryHeader
        isDirty={isDirty}
        isSelected={isAnyItemSelected}
        onClickSave={handleSaveAll}
        onClickReset={handleResetAll}
        onClickNavigateDetail={navigateToDetail}
      />
      {!isLoading && !isValidating && (
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
