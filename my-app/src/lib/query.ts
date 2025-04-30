import { TaskSummaryRangeQuery } from "@/type/Task";

/** パラメータからタスク一覧ページ用のクエリを取得する関数 */
export const getTaskSummaryQuery = (
  params: URLSearchParams
): TaskSummaryRangeQuery => {
  const progress = params.get("progress") ?? undefined;
  const startDate = params.get("startDate") ?? undefined;
  const lastDate = params.get("lastDate") ?? undefined;
  const activeOnly = params.get("activeOnly") ?? undefined;
  return {
    ...(progress !== undefined && { progress }),
    ...(startDate !== undefined && { startDate }),
    ...(lastDate !== undefined && { lastDate }),
    ...(activeOnly !== undefined && { activeOnly }),
  };
};
