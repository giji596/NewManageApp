import apiClient from "@/lib/apiClient";
import { MainPageTaskTable } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * メインページのタスクテーブルコンポーネントのロジック
 */
export default function TaskTableLogic() {
  const router = useRouter();
  const { data: rawData, isLoading } = useAspidaSWR(
    apiClient.work_log.tasks.progress.last_month,
    "get",
    { key: "api/work-log/tasks/progress/last-month" }
  );
  // TODO:実際はデータフェッチさせる
  const data: MainPageTaskTable[] = rawData?.body ?? [];

  const navigateToDetail = useCallback(
    (id: number) => {
      router.push(`work-log/task/${id}`);
    },
    [router]
  );
  return {
    /** 表示するデータ */
    data,
    /** データのロード状態 */
    isLoading,
    /** タスク詳細ページへ飛ぶハンドラー */
    navigateToDetail,
  };
}
