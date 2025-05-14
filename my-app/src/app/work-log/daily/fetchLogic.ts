import useAspidaSWR from "@aspida/swr";
import apiClient from "@/lib/apiClient";
import { useSearchParams } from "next/navigation";
import { DateSummary } from "@/type/Date";
import { getTodayMonth, getTodayYear } from "@/lib/date";

/**
 * DailyPageのフェッチ関連のロジック
 */
export default function DailyPageFetchLogic() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  // key用のクエリの初期値(undefined時は現在の日付のデータを返すようになってるので)
  const _year = year ?? getTodayYear();
  const _month = month ?? getTodayMonth();

  const { data, isLoading: isLoadingItemList } = useAspidaSWR(
    apiClient.work_log.daily.summary,
    "get",
    {
      query: { year, month },
      key: ["api/work-log/daily/summary", `year=${_year}&month=${_month}`],
    }
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
