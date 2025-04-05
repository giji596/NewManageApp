import { ERROR_PAGE_ID } from "@/constant/errorPages";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useCallback, useMemo, useState } from "react";

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
    /** アイテムの行をクリックした際のハンドラー
     * アイテムを選択しているかどうかで選択/選択解除を行う
     */
    handleClickRow,
  };
}
