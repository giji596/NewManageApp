import { DUMMY_TASK_DETAIL_MEMO } from "@/dummy/task-page";
import { TaskDetail } from "@/type/Task";
import { format } from "date-fns";
import { useMemo } from "react";

/**
 * タスク詳細ページのカスタムフック
 */
export default function useTaskDetailPage() {
  // TODO:でーたふぇっちさせる
  const data: TaskDetail = {
    id: 1,
    name: "タスク1",
    category: { id: 1, name: "カテゴリ1" },
    isFavorite: false,
    progress: 70,
    totalHours: 35,
    startDate: new Date("2024-12-22"),
    lastDate: new Date("2025-02-22"),
    memo: DUMMY_TASK_DETAIL_MEMO,
  };
  const isLoading = false;
  const taskName = data.name;
  const categoryId = data.category.id;
  const categoryName = data.category.name;
  const isFavorite = data.isFavorite;
  const progress = data.progress;
  const totalHours = data.totalHours;
  const startDateString = useMemo(
    () => format(data.startDate, "yyyy/MM/dd"),
    [data.startDate]
  );
  const lastDateString = useMemo(
    () => format(data.lastDate, "yyyy/MM/dd"),
    [data.lastDate]
  );
  const memoList = useMemo(() => data.memo, [data.memo]); // タスク名の更新時の再フェッチ時に更新しないように設定
  return {
    /** ロード状態 */
    isLoading,
    /** タスク名 */
    taskName,
    /** カテゴリid */
    categoryId,
    /** カテゴリ名 */
    categoryName,
    /** お気に入りか */
    isFavorite,
    /** 進捗率 */
    progress,
    /** 合計稼働時間 */
    totalHours,
    /** 開始日(string) */
    startDateString,
    /** 最終実施日(string) */
    lastDateString,
    /** メモリスト */
    memoList,
  };
}
