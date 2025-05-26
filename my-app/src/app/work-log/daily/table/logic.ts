import { getTodayMonth, getTodayYear } from "@/lib/date";
import { localClient } from "@/lib/localClient";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

/**
 * 日ごとの一覧ページのテーブルコンポーネントのロジック部分
 */
export default function DailyTableLogic() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  // key用のクエリの初期値(undefined時は現在の日付のデータを返すようになってるので)
  const _year = year ?? getTodayYear();
  const _month = month ?? getTodayMonth();

  const { data, isLoading } = useSWR(
    ["api/work-log/daily/summary", `year=${_year}&month=${_month}`],
    localClient.work_log.daily.summary.get({ query: { year, month } })
  );
  const itemList = useMemo(
    () =>
      (data ?? []).map((v, idx) => {
        return {
          ...v,
          date: new Date(v.date),
          id: idx,
        };
      }),
    [data]
  );

  const dateToId = useCallback(
    (date: Date) => Number(format(date, "yyyyMMdd")),
    []
  );

  const dateToParam = useCallback(
    (date: Date) => format(date, "yyyy-MM-dd"),
    []
  );

  // idからメモのタイトル一覧を取得する関数
  const getMemoTitleArrayById = useCallback(
    (id: number) => {
      const target = itemList.find((item) => dateToId(item.date) === id);
      const array: string[] = [];
      if (target) {
        target.memo.forEach((item) => array.push(item.title));
      }
      return array;
    },
    [dateToId, itemList]
  );

  // ページ移動
  const router = useRouter();

  const handleNavigateSelectedDay = useCallback(
    (id: number) => {
      const target = itemList.find((v) => v.id === id);
      const dateParam = dateToParam(target?.date ?? new Date());
      router.push(`/work-log/daily/${dateParam}`);
    },
    [dateToParam, itemList, router]
  );

  return {
    /** アイテム全体のリスト */
    itemList,
    /** アイテム全体(テーブルのやつ)のロード状態 */
    isLoading,
    /** dateをホバー時のメモ開封用にid:number型に変換する関数 */
    dateToId,
    /** 該当するidのデータのメモのタイトルの配列を取得する関数 */
    getMemoTitleArrayById,
    /** 指定された詳細ページにナビゲートするハンドラー */
    handleNavigateSelectedDay,
  };
}
