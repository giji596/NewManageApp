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

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: DailyDetailTaskTableType,
      b: DailyDetailTaskTableType,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { c: a.task.name, d: b.task.name };
        case "カテゴリ名":
          return { c: a.category.name, d: b.category.name };
        case "稼働時間":
          return { c: a.dailyHours, d: b.dailyHours };
        default:
          return { c: a.id, d: b.id };
      }
    },
    []
  );

  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "日付", getSortTarget });
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
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
