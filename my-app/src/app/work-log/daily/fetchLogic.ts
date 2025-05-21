import { useSearchParams } from "next/navigation";
import { DateSummary } from "@/type/Date";
import { getTodayMonth, getTodayYear } from "@/lib/date";
import useSWR from "swr";
import { localClient } from "@/lib/localClient";

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

  const { data, isLoading: isLoadingItemList } = useSWR(
    ["api/work-log/daily/summary", `year=${_year}&month=${_month}`],
    localClient.work_log.daily.summary.get({ query: { year, month } })
  );
  const rawItemList = data ?? [];
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
