import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { TaskSummary } from "@/type/Task";
import { useCallback, useState } from "react";

type Props = {
  /** タスク一覧データ */
  taskList: TaskSummary[];
};

/**
 * タスク一覧ページのテーブルのロジック
 */
export default function TaskSummaryTableLogic({ taskList }: Props) {
  // カテゴリのフィルター値
  const defaultCategoryFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const categoryName = b.categoryName;
      if (!(categoryName in a)) {
        a[categoryName] = false;
      }
      return a;
    },
    {}
  );
  const {
    filterList: categoryFilterList,
    toggleFilterCheckBox: toggleCategoryFilterCheckBox,
    doFilterByFilterList: doFilterByCategoryFilterList,
  } = useTableFilter({ initialFilterList: defaultCategoryFilterList });

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: TaskSummary,
      b: TaskSummary,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { c: a.taskName, d: b.taskName };
        case "カテゴリ名":
          return { c: a.categoryName, d: b.categoryName };
        case "進捗":
          return { c: a.progress, d: b.progress };
        case "稼働合計":
          return { c: a.totalHours, d: b.totalHours };
        case "稼働開始日":
          return { c: a.startDate, d: b.startDate };
        case "最終稼働日":
          return { c: a.lastDate, d: b.lastDate };
        default:
          return { c: a.id, d: b.id };
      }
    },
    []
  );

  const { isAsc, isSelected, handleClickSortLabel, doSort } = useTableSort({
    initialTarget: "タスク名",
    getSortTarget,
  });

  const [isFavoriteChecked, setIsFavoriteChecked] = useState<boolean>(false);
  const toggleFavoriteCheck = useCallback(
    () => setIsFavoriteChecked((prev) => !prev),
    []
  );

  const sortFunction = useCallback(
    (a: TaskSummary, b: TaskSummary) => {
      const result = doSort(a, b);
      if (isFavoriteChecked) {
        // 前後でisFavoriteが違う場合のみソート(通常のソートと併用しつつ、isFavoriteを優先させるため)
        if (a.isFavorite !== b.isFavorite) {
          return Number(b.isFavorite) - Number(a.isFavorite);
        }
      }
      // 通常のソート
      return result;
    },
    [doSort, isFavoriteChecked]
  );

  const doFilterByFilterList = useCallback(
    (item: TaskSummary) => {
      const result = doFilterByCategoryFilterList(item.categoryName);
      return result;
    },
    [doFilterByCategoryFilterList]
  );
  return {
    /** ソートの昇順/降順 */
    isAsc,
    /** カテゴリのフィルターリスト */
    categoryFilterList,
    /** お気に入りのチェック状態 */
    isFavoriteChecked,
    /** お気に入りのチェックを切り替える関数 */
    toggleFavoriteCheck,
    /** タイトルの選択状態 */
    isSelected,
    /** ソートラベルをクリックした際のハンドラー(ソート対象の切り替え) */
    handleClickSortLabel,
    /** ソートする関数 */
    sortFunction,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
