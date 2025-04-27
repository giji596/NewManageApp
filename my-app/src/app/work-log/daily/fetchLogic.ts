import useAspidaSWR from "@aspida/swr";
import apiClient from "@/lib/apiClient";
import { useSearchParams } from "next/navigation";
import { DateSummary } from "@/type/Date";

/**
 * DailyPageのフェッチ関連のロジック
 */
export default function DailyPageFetchLogic() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  const { data, isLoading: isLoadingItemList } = useAspidaSWR(
    apiClient.work_log.daily.summary,
    "get",
    { query: { year, month } }
  );
  const rawItemList = data?.body ?? [];
  const itemList: DateSummary[] = rawItemList.map((v) => {
    return { ...v, date: new Date(v.date) };
  });

  return {
    /** アイテム全体のリスト */
    itemList,
    /** アイテム全体(テーブルのやつ)のロード状態 */
    isLoadingItemList,
  };
}
