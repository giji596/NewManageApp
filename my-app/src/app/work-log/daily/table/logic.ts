import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { DateSummary } from "@/type/Date";
import { TableSortTargetType } from "@/type/Table";
import { format } from "date-fns";
import { useCallback } from "react";

type Props = {
  /** アイテム */
  itemList: DateSummary[];
};

/**
 * 日ごとの一覧ページのテーブルコンポーネントのロジック部分
 */
export default function DailyTableLogic({ itemList }: Props) {
  const dateToId = useCallback(
    (date: Date) => Number(format(date, "yyyyMMdd")),
    []
  );

  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = itemList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.taskName;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );

  // itemリストに存在するカテゴリ一覧
  const defaultCategoryFilterList = itemList.reduce(
    (a: Record<string, boolean>, b) => {
      const categoryName = b.categoryName;
      if (!(categoryName in a)) {
        a[categoryName] = false;
      }
      return a;
    },
    {}
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

  return {
    /** dateをホバー時のメモ開封用にid:number型に変換する関数 */
    dateToId,
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
  };
}
