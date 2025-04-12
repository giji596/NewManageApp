import { DUMMY_TASK_SUMMARY_DATA } from "@/dummy/task-page";
import { useCallback, useMemo, useState } from "react";

/**
 * タスク一覧ページのパラメータ関連
 */
export default function TaskSummaryPageParams() {
  // TODO:データフェッチさせる
  const taskSummaryData = DUMMY_TASK_SUMMARY_DATA;
  const isLoading = false;

  const [isDirtyRecord, setIsDirtyRecord] = useState<Record<number, boolean>>(
    {}
  );
  const onDirtyChange = useCallback((id: number, isDirty: boolean) => {
    setIsDirtyRecord((prev) => ({ ...prev, [id]: isDirty }));
  }, []);

  const isDirty = useMemo(
    () => !Object.values(isDirtyRecord).every((value) => value === false),
    [isDirtyRecord]
  );
  console.log(isDirtyRecord);

  return {
    /** タスク一覧 */
    taskSummaryData,
    /** ロード状態 */
    isLoading,
    /** dirty状態を切り替える関数(各行について切り替え) */
    onDirtyChange,
    /** dirtyかどうか(全ての行がdirtyでない場合のみfalse) */
    isDirty,
  };
}
