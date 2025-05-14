import useTableFilter from "@/hook/useTableFilter";
import useTableSort from "@/hook/useTableSort";
import { MemoDailyTask } from "@/type/Memo";
import { TableSortTargetType } from "@/type/Table";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** メモの一覧 */
  memoItemList: MemoDailyTask[];
  /** 選択中のタスクのid(ハイライトように) */
  selectedItemTaskId: number;
};

/**
 * 日付詳細 - メモリストのロジック部分
 */
export default function MemoListLogic({
  memoItemList,
  selectedItemTaskId,
}: Props) {
  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = useMemo(
    () =>
      memoItemList.reduce((a: Record<string, boolean>, b) => {
        const taskName = b.task.name;
        if (!(taskName in a)) {
          a[taskName] = false;
        }
        return a;
      }, {}),
    [memoItemList]
  );
  // タグ一覧
  const defaultTagFilterList = useMemo(
    () =>
      memoItemList.reduce((a: Record<string, boolean>, b) => {
        const tagName = b.tagName;
        if (!(tagName in a)) {
          a[tagName] = false;
        }
        return a;
      }, {}),
    [memoItemList]
  );

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: MemoDailyTask,
      b: MemoDailyTask,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      switch (target) {
        case "タイトル":
          return { c: a.title, d: b.title };
        case "タスク名":
          return { c: a.task.name, d: b.task.name };
        default:
          return { c: a.id, d: b.id };
      }
    },
    []
  );

  const { isAsc, isSelected, handleClickSortLabel, doSort } = useTableSort({
    initialTarget: null,
    getSortTarget,
  });
  const {
    filterList: taskFilterList,
    toggleFilterCheckBox: toggleTaskFilterCheckBox,
    doFilterByFilterList: doFilterByTaskFilterList,
  } = useTableFilter({ initialFilterList: defaultTaskFilterList });
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const {
    filterList: tagFilterList,
    toggleFilterCheckBox: toggleTagFilterCheckBox,
    doFilterByFilterList: doFilterByTagFilterList,
  } = useTableFilter({ initialFilterList: defaultTagFilterList });
  const isActiveRow = useCallback(
    (id: number) => selectedRowId === id,
    [selectedRowId]
  );

  const handleClickRow = useCallback(
    (id: number) => {
      if (selectedRowId === id) {
        setSelectedRowId(null);
      } else {
        setSelectedRowId(id);
      }
    },
    [selectedRowId]
  );

  const doFilterByFilterList = useCallback(
    (item: MemoDailyTask) => {
      let result: boolean;
      // タスク名でフィルターする
      result = doFilterByTaskFilterList(item.task.name);
      // フィルター対象外(true)の場合はタグでも検証
      if (result) {
        result = doFilterByTagFilterList(item.tagName);
      }
      // フィルター結果(false=フィルター対象)
      return result;
    },
    [doFilterByTagFilterList, doFilterByTaskFilterList]
  );

  const isSelectedTaskRow = useCallback(
    (id: number) => selectedItemTaskId === id,
    [selectedItemTaskId]
  );
  return {
    /** 指定されたidの列がアクティブかどうかを求める */
    isActiveRow,
    /** 行をクリックした際のハンドラー
     * 指定した行をActiveにする
     * すでにActiveなら非Activeにする
     */
    handleClickRow,
    /** ソートが昇順か降順か */
    isAsc,
    /** ソート対象に選択されているかどうかを調べる */
    isSelected,
    /** ソート対象に選択するハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** タスクのフィルター対象の一覧(key:value=string:booleanのオブジェクト) */
    taskFilterList,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** タグのフィルター対象の一覧(key:value=string:booleanのオブジェクト) */
    tagFilterList,
    /** タグのフィルターリストのチェックボックスを切り替える関数 */
    toggleTagFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
    /** 選択中のタスクと関連する行か */
    isSelectedTaskRow,
  };
}
