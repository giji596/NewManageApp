import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useCallback } from "react";

type Props = {
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
};

/**
 * タスクテーブルのロジック
 */
export default function TaskTableLogic({ taskList }: Props) {
  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.task.name;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );

  // itemリストに存在するカテゴリ一覧
  const defaultCategoryFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const categoryName = b.category.name;
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
      a: DailyDetailTaskTableType,
      b: DailyDetailTaskTableType
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { a: a.task.name, b: b.task.name };
        case "カテゴリ名":
          return { a: a.category.name, b: b.category.name };
        case "稼働時間":
          return { a: a.dailyHours, b: b.dailyHours };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  const doFilterByFilterList = useCallback(
    (item: DailyDetailTaskTableType) => {
      // フィルター結果を変数で保持
      let result: boolean;
      // カテゴリーでのフィルター
      result = doFilterByCategoryFilterList(item.category.name);
      // カテゴリーフィルター対象外(trueの場合)ならタスクフィルターを検証
      if (result) {
        result = doFilterByTaskFilterList(item.task.name);
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
    /** ソート対象を取得する関数 */
    getSortTarget,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
