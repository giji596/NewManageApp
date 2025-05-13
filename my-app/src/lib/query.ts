import { TaskSummaryRangeQuery } from "@/type/Task";

/** パラメータからタスク一覧ページ用のクエリを取得する関数 */
export const getTaskSummaryQuery = (
  params: URLSearchParams
): TaskSummaryRangeQuery => {
  const progress = params.get("progress") ?? undefined;
  const firstActivityDate = params.get("firstActivityDate") ?? undefined;
  const lastActivityDate = params.get("lastActivityDate") ?? undefined;
  const activeOnly = params.get("activeOnly") ?? undefined;
  return {
    ...(progress !== undefined && { progress }),
    ...(firstActivityDate !== undefined && { firstActivityDate }),
    ...(lastActivityDate !== undefined && { lastActivityDate }),
    ...(activeOnly !== undefined && { activeOnly }),
  };
};
