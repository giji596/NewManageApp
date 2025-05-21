import { localClient } from "@/lib/localClient";
import { MainPageTaskTable } from "@/type/Task";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

/**
 * メインページのタスクテーブルコンポーネントのロジック
 */
export default function TaskTableLogic() {
  const router = useRouter();
  const { data: rawData, isLoading } = useSWR(
    "api/work-log/tasks/progress/last-month",
    localClient.work_log.tasks.progress.last_month.get()
  );
  const data: MainPageTaskTable[] = rawData ?? [];

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
