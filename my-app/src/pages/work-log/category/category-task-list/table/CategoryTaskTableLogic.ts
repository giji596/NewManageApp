import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { CategoryTaskList } from "@/type/Task";
import { useCallback } from "react";

/**
 * カテゴリページのタスク一覧のテーブルのロジック
 */
export default function CategoryTaskTableLogic() {
  const getSortTarget = useCallback(
    (
      a: CategoryTaskList,
      b: CategoryTaskList
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { a: a.name, b: b.name };
        case "進捗":
          return { a: a.progress, b: b.progress };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "progress" });

  return {
    /** 昇順かどうか */
    isAsc,
    /** 特定のタイトルが選択状態か調べる */
    isSelected,
    /** ソート対象のラベルをクリックした際のハンドラー(ソート対象に指定 or 対象であれば昇順降順の切り替え) */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort: (a: CategoryTaskList, b: CategoryTaskList) => doSort(getSort),
  };
}
