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
  // タスクのフィルター値
  const defaultTaskFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.taskName;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );
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
    filterList: taskFilterList,
    toggleFilterCheckBox: toggleTaskFilterCheckBox,
    doFilterByFilterList: doFilterByTaskFilterList,
  } = useTableFilter({ initialFilterList: defaultTaskFilterList });
  const {
    filterList: categoryFilterList,
    toggleFilterCheckBox: toggleCategoryFilterCheckBox,
    doFilterByFilterList: doFilterByCategoryFilterList,
  } = useTableFilter({ initialFilterList: defaultCategoryFilterList });
  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "タスク名" });

  const [isFavoriteChecked, setIsFavoriteChecked] = useState<boolean>(false);
  const toggleFavoriteCheck = useCallback(
    () => setIsFavoriteChecked((prev) => !prev),
    []
  );

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: TaskSummary,
      b: TaskSummary
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { a: a.taskName, b: b.taskName };
        case "カテゴリ名":
          return { a: a.categoryName, b: b.categoryName };
        case "進捗":
          return { a: a.progress, b: b.progress };
        case "稼働合計":
          return { a: a.totalHours, b: b.totalHours };
        case "稼働開始日":
          return { a: a.startDate, b: b.startDate };
        case "最終稼働日":
          return { a: a.lastDate, b: b.lastDate };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  const sortFunction = useCallback(
    (a: TaskSummary, b: TaskSummary) => {
      const result = doSort(getSortTarget(a, b));
      if (isFavoriteChecked) {
        // 前後でisFavoriteが違う場合のみソート(通常のソートと併用しつつ、isFavoriteを優先させるため)
        if (a.isFavorite !== b.isFavorite) {
          return Number(b.isFavorite) - Number(a.isFavorite);
        }
      }
      // 通常のソート
      return result;
    },
    [doSort, getSortTarget, isFavoriteChecked]
  );

  const doFilterByFilterList = useCallback(
    (item: TaskSummary) => {
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
    /** ソートの昇順/降順 */
    isAsc,
    /** タスクのフィルターリスト */
    taskFilterList,
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
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
