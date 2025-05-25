import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { getTodayMonth, getTodayYear } from "@/lib/date";
import { localClient } from "@/lib/localClient";
import { DateSummary } from "@/type/Date";
import { TableSortTargetType } from "@/type/Table";
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
      (data ?? []).map((v) => {
        return { ...v, date: new Date(v.date) };
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

  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = useMemo(
    () =>
      itemList.reduce((a: Record<string, boolean>, b) => {
        const taskName = b.taskName;
        if (!(taskName in a)) {
          a[taskName] = false;
        }
        return a;
      }, {}),
    [itemList]
  );

  // itemリストに存在するカテゴリ一覧
  const defaultCategoryFilterList = useMemo(
    () =>
      itemList.reduce((a: Record<string, boolean>, b) => {
        const categoryName = b.categoryName;
        if (!(categoryName in a)) {
          a[categoryName] = false;
        }
        return a;
      }, {}),
    [itemList]
  );

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: DateSummary,
      b: DateSummary,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "メインカテゴリ":
          return { c: a.categoryName, d: b.categoryName };
        case "メインタスク":
          return { c: a.taskName, d: b.taskName };
        case "合計稼働時間":
          return { c: a.dailyHours, d: b.dailyHours };
        case "日付":
          return { c: a.date, d: b.date };
        default:
          return { c: a.date, d: b.date };
      }
    },
    []
  );

  const { isAsc, isSelected, handleClickSortLabel, doSort } = useTableSort({
    initialTarget: "日付",
    getSortTarget,
  });
  const {
    filterList: taskFilterList,
    toggleFilterCheckBox: toggleTaskFilterCheckBox,
    doFilterByFilterList: doFilterByTaskFilterList,
  } = useTableFilter({ initialFilterList: defaultTaskFilterList });
  const {
    filterList: categoryFilterList,
    toggleFilterCheckBox: toggleCategoryFilterCheckBox,
    doFilterByFilterList: doFilterByCategoryFilterList,
  } = useTableFilter({ initialFilterList: defaultCategoryFilterList });

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

  const doFilterByFilterList = useCallback(
    (item: DateSummary) => {
      // フィルター結果を変数で保持
      let result: boolean;
      // カテゴリーでのフィルター
      result = doFilterByCategoryFilterList(item.categoryName);
      // カテゴリーフィルター対象外(trueの場合)ならタスクフィルターを検証
      if (result) {
        result = doFilterByTaskFilterList(item.taskName);
      }
      // 両方のフィルターでカットされていない場合だけ表示
      return result;
    },
    [doFilterByCategoryFilterList, doFilterByTaskFilterList]
  );

  // ページ移動
  const router = useRouter();

  const handleNavigateSelectedDay = useCallback(
    (dateParam: string) => {
      router.push(`/work-log/daily/${dateParam}`);
    },
    [router]
  );

  return {
    /** アイテム全体のリスト */
    itemList,
    /** アイテム全体(テーブルのやつ)のロード状態 */
    isLoading,
    /** dateをホバー時のメモ開封用にid:number型に変換する関数 */
    dateToId,
    /** dateをナビゲーション用のパラメータstringに変換する関数 */
    dateToParam,
    /** 現在昇順かどうか */
    isAsc,
    /** アイテムのタスク名とチェック状態のRecordオブジェクト */
    taskFilterList,
    /** アイテムのカテゴリ名とチェック状態のRecordオブジェクト */
    categoryFilterList,
    /** 選択中かどうか調べる関数 */
    isSelected,
    /** ソートラベルをクリックした際のハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** 該当するidのデータのメモのタイトルの配列を取得する関数 */
    getMemoTitleArrayById,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
    /** 指定された詳細ページにナビゲートするハンドラー */
    handleNavigateSelectedDay,
  };
}
