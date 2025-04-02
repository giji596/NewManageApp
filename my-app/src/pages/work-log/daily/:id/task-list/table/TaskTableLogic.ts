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
      const taskName = b.name;
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
      const categoryName = b.categoryName;
      if (!(categoryName in a)) {
        a[categoryName] = false;
      }
      return a;
    },
    {}
  );

  const [selected, setSelected] = useState<string>("日付");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [taskFilterList, setTaskFilterList] = useState<Record<string, boolean>>(
    defaultTaskFilterList
  );
  const [categoryFilterList, setCategoryFilterList] = useState<
    Record<string, boolean>
  >(defaultCategoryFilterList);

  // 該当するタイトルが選択中か調べる
  const isSelected = useCallback(
    (title: string): boolean => title == selected,
    [selected]
  );
  // プロパティをソート設定する関数
  const handleSetSortTarget = useCallback(
    (title: string): void => {
      // 選択中の場合:ascとdescを入れ替える
      if (isSelected(title)) {
        setIsAsc(!isAsc);
      } else {
        setSelected(title);
        setIsAsc(true);
      }
    },
    [isAsc, isSelected]
  );

  // ソート関数
  const doSortByTitle = useCallback(
    (a: DailyDetailTaskTableType, b: DailyDetailTaskTableType) => {
      switch (selected) {
        case "タスク名":
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "カテゴリ名":
          return isAsc
            ? a.categoryName.localeCompare(b.categoryName)
            : b.categoryName.localeCompare(a.categoryName);
        case "稼働時間":
          return isAsc
            ? a.dailyHours - b.dailyHours
            : b.dailyHours - a.dailyHours;
        default:
          return 0;
      }
    },
    [isAsc, selected]
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
        const isCutByCategory = !categoryFilterList[item.categoryName];
        if (isCutByCategory) {
          return false;
        }
      }
      // タスクについて
      if (!isNoTaskFilter) {
        const isCutByTask = !taskFilterList[item.name];
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
    /** ソート対象を関数 */
    handleSetSortTarget,
    /** ソートする関数 */
    doSortByTitle,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
