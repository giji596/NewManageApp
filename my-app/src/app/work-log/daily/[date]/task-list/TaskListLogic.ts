import { ERROR_PAGE_ID } from "@/constant/errorPages";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
};

/**
 * 日付詳細ページ - タスクリストのロジック部分
 */
export default function TaskListLogic({ taskList }: Props) {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const isItemSelected = !(selectedItemId == null);

  // タスクの一覧に変更があった場合(SWRで再フェッチが行われるタイミング)、選択を解除する
  useEffect(() => {
    setSelectedItemId(null);
    // 長さが変わった場合のみ(create/delete)選択を解除させる
  }, [taskList.length]);
  const selectedItemTaskId = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.task.id;
    return ERROR_PAGE_ID;
  }, [selectedItemId, taskList]);

  const selectedItemCategoryId = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.category.id;
    return ERROR_PAGE_ID;
  }, [selectedItemId, taskList]);

  const selectedItemHours = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.dailyHours;
    return 0;
  }, [selectedItemId, taskList]);

  // ローカル--------------------------------------------------
  const doSelectItem = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  const doDeselectItem = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  // -----------------------------------------------------------

  const handleClickRow = useCallback(
    (id: number) => {
      // アイテムが選択中のアイテムと一致する場合
      // 選択の解除を行う
      if (selectedItemId === id) {
        doDeselectItem();
      } else {
        // 選択中のアイテムでない場合
        // 選択中のアイテムを変更する
        doSelectItem(id);
      }
    },
    [doDeselectItem, doSelectItem, selectedItemId]
  );

  return {
    /** 選択中のアイテムID(非選択時はnull) */
    selectedItemId,
    /** 選択中のアイテムがあるか(selectedIdの値に依存) */
    isItemSelected,
    /** 選択中のアイテムのタスクid */
    selectedItemTaskId,
    /** 選択中のアイテムのカテゴリーid */
    selectedItemCategoryId,
    /** 選択中のアイテムの稼働時間 */
    selectedItemHours,
    /** アイテムの行をクリックした際のハンドラー
     * アイテムを選択しているかどうかで選択/選択解除を行う
     */
    handleClickRow,
  };
}
