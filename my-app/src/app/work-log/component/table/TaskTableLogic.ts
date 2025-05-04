import apiClient from "@/lib/apiClient";
import { MainPageTaskTable } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { useCallback } from "react";

/**
 * メインページのタスクテーブルコンポーネントのロジック
 */
export default function TaskTableLogic() {
  const { data: rawData } = useAspidaSWR(
    apiClient.work_log.tasks.progress.last_month,
    "get",
    { key: "api/work-log/tasks/progress/last-month" }
  );
  // TODO:実際はデータフェッチさせる
  const data: MainPageTaskTable[] = rawData?.body ?? [];

  const navigateToDetail = useCallback((id: number) => {
    // TODO: ページ移動のハンドラ追加
    console.log("タスク詳細ページへ id:", id);
  }, []);
  return {
    /** 表示するデータ */
    data,
    /** タスク詳細ページへ飛ぶハンドラー */
    navigateToDetail,
  };
}
