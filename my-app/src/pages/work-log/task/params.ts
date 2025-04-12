import { DUMMY_TASK_SUMMARY_DATA } from "@/dummy/task-page";

/**
 * タスク一覧ページのパラメータ関連
 */
export default function TaskSummaryPageParams() {
  // TODO:データフェッチさせる
  const taskSummaryData = DUMMY_TASK_SUMMARY_DATA;
  const isLoading = false;

  return {
    /** タスク一覧 */
    taskSummaryData,
    /** ロード状態 */
    isLoading,
  };
}
