import { localClient } from "@/lib/localClient";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

/**
 * メインページの円グラフのロジック
 */
export default function MainPagePieChartLogic() {
  const router = useRouter();
  const { data: rawData } = useSWR(
    "api/work-log/tasks/activities/last-month",
    localClient.work_log.tasks.activities.last_month.get()
  );

  const data = rawData ?? [];

  const navigateCategoryPage = useCallback(
    (id: number) => {
      router.push(`/work-log/category?id=${id}`);
    },
    [router]
  );

  return {
    /** 表示するデータ */
    data,
    /** カテゴリページ移動するハンドラー */
    navigateCategoryPage,
  };
}
