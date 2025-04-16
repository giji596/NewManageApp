import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { MemoTaskDetail } from "@/type/Memo";
import { TableSortTargetType } from "@/type/Table";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const handleClickRow = useCallback((id: number) => {
    setActiveRowId((prev) => {
      if (prev === id) return null; // 選択済みならnullを返して選択を解除
      return id; // それ以外は新たなidをセットさせる
    });
  }, []);
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

  const getSortTarget = useCallback(
    (
      a: MemoTaskDetail,
      b: MemoTaskDetail,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "日付":
          return { c: a.date, d: b.date };
        case "タイトル":
          return { c: a.title, d: b.title };
        case "タグ":
          return { c: a.tag, d: b.tag };
        default:
          return { c: 0, d: 0 };
      }
    },
    []
  );

  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "日付", getSortTarget });

  return {
    /** 現在アクティブな行のid */
    activeRowId,
    /** 行をクリックした際のハンドラー(アクティブな行の設定/解除) */
    handleClickRow,
    /** 昇順かどうか */
    isAsc,
    /** タイトルが選択中かどうかを調べる関数 */
    isSelected,
    /** タイトルラベルをクリックした際のソートのハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** フィルターリスト */
    filterList,
    /** フィルターのチェックボックスを切り替える関数 */
    toggleFilterCheckBox,
    /** フィルターする関数 */
    doFilterByFilterList: (item: MemoTaskDetail) =>
      doFilterByFilterList(item.tag),
  };
}
