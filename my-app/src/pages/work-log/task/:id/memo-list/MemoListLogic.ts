import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { MemoTaskDetail } from "@/type/Memo";
import { TableSortTargetType } from "@/type/Table";
import { useCallback, useMemo } from "react";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
  // タグのフィルターリスト
  const tagFilterList = useMemo(
    () =>
      memoItemList.reduce<Record<string, boolean>>((a, b) => {
        if (b.tag in a) return a;
        a = { ...a, [b.tag]: false };
        return a;
      }, {}),
    [memoItemList]
  );

  const { filterList, toggleFilterCheckBox, doFilterByFilterList } =
    useTableFilter({ initialFilterList: tagFilterList });
  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "日付" });

  const getSortTargetValue = useCallback(
    (
      a: MemoTaskDetail,
      b: MemoTaskDetail
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "日付":
          return { a: a.date, b: b.date };
        case "タイトル":
          return { a: a.title, b: b.title };
        case "タグ":
          return { a: a.tag, b: b.tag };
        default:
          return { a: 0, b: 0 };
      }
    },
    [target]
  );

  return {
    /** 昇順かどうか */
    isAsc,
    /** タイトルが選択中かどうかを調べる関数 */
    isSelected,
    /** タイトルラベルをクリックした際のソートのハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort: (a: MemoTaskDetail, b: MemoTaskDetail) =>
      doSort(getSortTargetValue(a, b)),
    /** フィルターリスト */
    filterList,
    /** フィルターのチェックボックスを切り替える関数 */
    toggleFilterCheckBox,
    /** フィルターする関数 */
    doFilterByFilterList: (item: MemoTaskDetail) =>
      doFilterByFilterList(item.tag),
  };
}
