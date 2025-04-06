import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useCallback, useState } from "react";

type Props = {
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
};

/**
 * タスクテーブルのロジック
 */
export default function TaskTableLogic({ taskList }: Props) {
  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.task.name;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );

  // itemリストに存在するカテゴリ一覧
  const defaultCategoryFilterList = taskList.reduce(
    (a: Record<string, boolean>, b) => {
      const categoryName = b.category.name;
      if (!(categoryName in a)) {
        a[categoryName] = false;
      }
      return a;
    },
    {}
  );
  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "日付" });
  const [taskFilterList, setTaskFilterList] = useState<Record<string, boolean>>(
    defaultTaskFilterList
  );
  const [categoryFilterList, setCategoryFilterList] = useState<
    Record<string, boolean>
  >(defaultCategoryFilterList);

  // ソート関数
  const getSortTarget = useCallback(
    (
      a: DailyDetailTaskTableType,
      b: DailyDetailTaskTableType
    ): { a: TableSortTargetType; b: TableSortTargetType } => {
      switch (target) {
        case "タスク名":
          return { a: a.task.name, b: b.task.name };
        case "カテゴリ名":
          return { a: a.category.name, b: b.category.name };
        case "稼働時間":
          return { a: a.dailyHours, b: b.dailyHours };
        default:
          return { a: a.id, b: b.id };
      }
    },
    [target]
  );

  // カテゴリーフィルターリストのチェックのOnOffを切り替える関数
  const toggleCategoryFilterCheckBox = useCallback(
    (name: string) => {
      const newValue = !categoryFilterList[name];
      console.log(newValue);
      setCategoryFilterList((prev) => ({ ...prev, [name]: newValue }));
    },
    [categoryFilterList]
  );

  // タスクフィルターリストのチェックのOnOffを切り替える関数
  const toggleTaskFilterCheckBox = useCallback(
    (name: string) => {
      const newValue = !taskFilterList[name];
      setTaskFilterList((prev) => ({ ...prev, [name]: newValue }));
    },
    [, taskFilterList]
  );

  // 選択されている内容に応じてフィルターする関数
  const doFilterByFilterList = useCallback(
    (item: DailyDetailTaskTableType): boolean => {
      // フィルターがセットされていない場合、trueを返してフィルターしない
      const isNoCategoryFilter = Object.values(categoryFilterList).every(
        (value) => value === false
      );
      const isNoTaskFilter = Object.values(taskFilterList).every(
        (value) => value === false
      );
      if (isNoCategoryFilter && isNoTaskFilter) {
        return true;
      }
      // カテゴリとタスクについてフィルターが存在する場合にカット対象か検証して、対象であれば早期にfalseでreturnする
      // カテゴリーについて
      if (!isNoCategoryFilter) {
        const isCutByCategory = !categoryFilterList[item.category.name];
        if (isCutByCategory) {
          return false;
        }
      }
      // タスクについて
      if (!isNoTaskFilter) {
        const isCutByTask = !taskFilterList[item.task.name];
        if (isCutByTask) {
          return false;
        }
      }
      return true;
    },
    [categoryFilterList, taskFilterList]
  );
  return {
    /** 現在昇順かどうか */
    isAsc,
    /** アイテムのタスク名とチェック状態のRecordオブジェクト */
    taskFilterList,
    /** アイテムのカテゴリ名とチェック状態のRecordオブジェクト */
    categoryFilterList,
    /** 選択中かどうか調べる関数 */
    isSelected,
    /** ソートラベルをクリックした際のハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** ソート対象を取得する関数 */
    getSortTarget,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
