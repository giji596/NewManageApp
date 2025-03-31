import { DateSummary } from "@/type/Date";
import { useCallback, useState } from "react";

type Props = {
  /** アイテム */
  itemList: DateSummary[];
};

/**
 * 日ごとの一覧ページのテーブルコンポーネントのロジック部分
 */
export default function DailyTableLogic({ itemList }: Props) {
  // itemリストに存在するタスク一覧
  const defaultTaskFilterList = itemList.reduce(
    (a: Record<string, boolean>, b) => {
      const taskName = b.taskName;
      if (!(taskName in a)) {
        a[taskName] = false;
      }
      return a;
    },
    {}
  );

  // itemリストに存在するカテゴリ一覧
  const defaultCategoryFilterList = itemList.reduce(
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
    (a: DateSummary, b: DateSummary) => {
      switch (selected) {
        case "メインカテゴリ":
          return isAsc
            ? a.categoryName.localeCompare(b.categoryName)
            : b.categoryName.localeCompare(a.categoryName);
        case "メインタスク":
          return isAsc
            ? a.taskName.localeCompare(b.taskName)
            : b.taskName.localeCompare(a.taskName);
        case "合計稼働時間":
          return isAsc
            ? a.dailyHours - b.dailyHours
            : b.dailyHours - a.dailyHours;
        case "日付":
          return isAsc
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        default:
          return 0;
      }
    },
    [isAsc, selected]
  );

  // idからメモのタイトル一覧を取得する関数
  const getMemoTitleArrayById = useCallback(
    (id: number) => {
      const target = itemList.find((item) => item.id === id);
      const array: string[] = [];
      if (target) {
        target.memo.forEach((item) => array.push(item.title));
      }
      return array;
    },
    [itemList]
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
    (item: DateSummary): boolean => {
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
        const isCutByTask = !taskFilterList[item.taskName];
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
    /** 該当するidのデータのメモのタイトルの配列を取得する関数 */
    getMemoTitleArrayById,
    /** カテゴリのフィルターリストのチェックボックスを切り替える関数 */
    toggleCategoryFilterCheckBox,
    /** タスクのフィルターリストのチェックボックスを切り替える関数 */
    toggleTaskFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
