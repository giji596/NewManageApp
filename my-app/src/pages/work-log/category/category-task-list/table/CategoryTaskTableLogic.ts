import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { CategoryTaskList } from "@/type/Task";
import { useCallback } from "react";

/**
 * カテゴリページのタスク一覧のテーブルのロジック
 */
export default function CategoryTaskTableLogic() {
  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "progress" });

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
}
