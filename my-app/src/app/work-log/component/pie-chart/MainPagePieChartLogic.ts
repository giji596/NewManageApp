import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { useCallback } from "react";

/**
 * メインページの円グラフのロジック
 */
export default function MainPagePieChartLogic() {
  const { data: rawData } = useAspidaSWR(
    apiClient.work_log.tasks.activities.last_month,
    "get",
    { key: "api/work-log/tasks/activities/last-month" }
  );
  const data = rawData?.body ?? [];

  const navigateCategoryPage = useCallback((id: number) => {
    console.log("異動先", id);
  }, []);

  return {
    /** 表示するデータ */
    data,
    /** カテゴリページ移動するハンドラー */
    navigateCategoryPage,
  };
}
