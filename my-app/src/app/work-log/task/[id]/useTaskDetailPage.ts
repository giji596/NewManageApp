import { DUMMY_TASK_DETAIL_MEMO } from "@/dummy/task-page";
import { TaskDetail } from "@/type/Task";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";

type Props = {
  /** パスパラメータ(ページ呼び出し時に自動的に取得) */
  params: { id: string };
};
/**
 * タスク詳細ページのカスタムフック
 */
export default function useTaskDetailPage({ params }: Props) {
  console.log("ぺーじid:", params.id);
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

  const handleComplete = useCallback(async () => {
    // TODO: データ更新させる(進捗を100%にする？)
    console.log("完了処理 対象id:", data.id);
  }, [data.id]);
  const handleDelete = useCallback(async () => {
    // TODO:データの削除と一覧ページへのナビゲーションを行う
    console.log("削除処理 対象id:", data.id);
  }, [data.id]);

  const navigateCategoryPage = useCallback(() => {
    // TODO:ナビゲートさせる
    console.log("カテゴリページへ移動 id:", categoryId);
  }, [categoryId]);
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
    /** 完了処理を行うハンドラー */
    handleComplete,
    /** 削除処理を行うハンドラー */
    handleDelete,
    /** カテゴリページへ移動するハンドラー */
    navigateCategoryPage,
  };
}
