import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { TaskSummary } from "@/type/Task";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** タスク一覧データ */
  taskList: TaskSummary[];
};

/**
 * タスク一覧ページのテーブルのロジック
 */
export default function TaskSummaryTableLogic({ taskList }: Props) {
  // カテゴリのフィルター値
  const defaultCategoryFilterList = useMemo(
    () =>
      taskList.reduce((a: Record<string, boolean>, b) => {
        const categoryName = b.categoryName;
        if (!(categoryName in a)) {
          a[categoryName] = false;
        }
        return a;
      }, {}),
    [taskList]
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
          return { c: a.firstActivityDate, d: b.firstActivityDate };
        case "最終実施日":
          return { c: a.lastActivityDate, d: b.lastActivityDate };
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
    initialTarget: "タスク名",
    getSortTarget,
  });

  const doFilterByFilterList = useCallback(
    (item: TaskSummary) => {
      const result = doFilterByCategoryFilterList(item.categoryName);
      return result;
    },
    [doFilterByCategoryFilterList]
  );

  // てーぶるのページねーしょん
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;
  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  const startOfPage = page * rowsPerPage;
  const endOfPage = startOfPage + rowsPerPage;
  const rows = useMemo(
    () => taskList.filter(doFilterByFilterList).sort(doSort),
    [taskList, doFilterByFilterList, doSort]
  );
  const rowCount = rows.length;

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
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** ページ番号 */
    page,
    /** ページあたりの件数 */
    rowsPerPage,
    /** 表示する行の開始番号 */
    startOfPage,
    /** 表示する行の終了番号 */
    endOfPage,
    /** ページ変更時のハンドラー */
    handleChangePage,
    /** 行データ */
    rows,
    /** 行データの個数 */
    rowCount,
  };
}
