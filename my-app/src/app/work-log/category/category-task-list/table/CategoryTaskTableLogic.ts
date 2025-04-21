import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { CategoryTaskList } from "@/type/Task";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * カテゴリページのタスク一覧のテーブルのロジック
 */
export default function CategoryTaskTableLogic() {
  const router = useRouter();
  const getSortTarget = useCallback(
    (
      a: CategoryTaskList,
      b: CategoryTaskList,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { c: a.name, d: b.name };
        case "進捗":
          return { c: a.progress, d: b.progress };
        default:
          return { c: a.id, d: b.id };
      }
    },
    []
  );

  const {
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    isFavoriteChecked,
    toggleFavoriteCheck,
  } = useTableSort({
    initialTarget: "progress",
    getSortTarget,
  });

  const navigateToTaskDetail = useCallback(
    (id: number) => {
      router.push(`/work-log/task/${id}`);
    },
    [router]
  );

  return {
    /** 昇順かどうか */
    isAsc,
    /** 特定のタイトルが選択状態か調べる */
    isSelected,
    /** ソート対象のラベルをクリックした際のハンドラー(ソート対象に指定 or 対象であれば昇順降順の切り替え) */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** お気に入りのソートのonOffのチェック状況 */
    isFavoriteChecked,
    /** お気に入りソートonOff切り替え */
    toggleFavoriteCheck,
    /** タスク詳細ページへ移動する関数 */
    navigateToTaskDetail,
  };
}
