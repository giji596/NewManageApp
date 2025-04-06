import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { DateSummary } from "@/type/Date";
import { TableSortTargetType } from "@/type/Table";
import { useCallback } from "react";

type Props = {
  /** アイテム */
  itemList: DateSummary[];
};

/**
 * 日ごとの一覧ページのテーブルコンポーネントのロジック部分
 */
export default function DailyTableLogic({ itemList }: Props) {
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

  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "日付" });
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

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: DateSummary,
      b: DateSummary
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "メインカテゴリ":
          return { a: a.categoryName, b: b.categoryName };
        case "メインタスク":
          return { a: a.taskName, b: b.taskName };
        case "合計稼働時間":
          return { a: a.dailyHours, b: b.dailyHours };
        case "日付":
          return { a: a.date, b: b.date };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  // idからメモのタイトル一覧を取得する関数
  const getMemoTitleArrayById = useCallback(
    (id: number) => {
      const target = itemList.find((item) => item.id === id);
      const array: string[] = [];
      if (target) {
        target.memo.forEach((item) => array.push(item.title));
      }
      return array;
    },
    [itemList]
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
    /** オブジェクトからソート対象の値を取得する関数 */
    getSortTarget,
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
