import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";

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

  return {
    /** 表示するデータ */
    data,
  };
}
