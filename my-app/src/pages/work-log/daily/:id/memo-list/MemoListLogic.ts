import useTableSort from "@/hook/useTableSort";
import { MemoDailyTask } from "@/type/Memo";
import { TableSortTargetType } from "@/type/Table";
import { useCallback, useState } from "react";

type Props = {
  /** メモの一覧 */
  memoItemList: MemoDailyTask[];
};

/**
 * 日付詳細 - メモリストのロジック部分
 */
export default function MemoListLogic({ memoItemList }: Props) {
  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = memoItemList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.task.name;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );

  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: null });
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [taskFilterList, setTaskFilterList] = useState<Record<string, boolean>>(
    defaultTaskFilterList
  );

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
  // タスクフィルターリストのチェックのOnOffを切り替える関数
  const toggleTaskFilterCheckBox = useCallback(
    (name: string) => {
      const newValue = !taskFilterList[name];
      setTaskFilterList((prev) => ({ ...prev, [name]: newValue }));
    },
    [, taskFilterList]
  );

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: MemoDailyTask,
      b: MemoDailyTask
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "タイトル":
          return { a: a.title, b: b.title };
        case "タスク名":
          return { a: a.task.name, b: b.task.name };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  // 選択されている内容に応じてフィルターする関数
  const doFilterByFilterList = useCallback(
    (item: MemoDailyTask): boolean => {
      // フィルターがセットされていない場合、trueを返してフィルターしない
      const isNoTaskFilter = Object.values(taskFilterList).every(
        (value) => value === false
      );
      if (isNoTaskFilter) {
        return true;
      }
      // フィルターが存在する場合にカット対象か検証して、対象であれば早期にfalseでreturnする
      const isCutByTask = !taskFilterList[item.task.name];
      if (isCutByTask) {
        return false;
      }
      return true;
    },
    [taskFilterList]
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
    /** ソート対象を取得する関数 */
    getSortTarget,
    /** タスクのフィルター対象の一覧(key:value=string:booleanのオブジェクト) */
    taskFilterList,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
