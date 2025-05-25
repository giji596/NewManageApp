import { ERROR_PAGE_ID } from "@/constant/errorPages";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type Props = {
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
  /** 選択中のアイテムのid */
  selectedItemId: number | null;
};

/**
 * 日付詳細ページ - タスクリストのロジック部分
 */
export default function TaskListLogic({ taskList, selectedItemId }: Props) {
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

  const selectedItemHours = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.dailyHours;
    return 0;
  }, [selectedItemId, taskList]);

  const isSelectedTaskCompleted = useMemo(
    () => taskList.find((item) => item.id === selectedItemId)?.isCompletedTask,
    [selectedItemId, taskList]
  );

  // 名称関連(完了タスクのダイアログ用)
  const selectedTaskName = useMemo(
    () =>
      taskList.find((v) => v.task.id === selectedItemTaskId)?.task.name ??
      "(タスクが見つからない？)", // undefinedにはならないはずなので適当なメッセージを設定
    [selectedItemTaskId, taskList]
  );
  const selectedCategoryName = useMemo(
    () =>
      taskList.find((v) => v.category.id === selectedItemCategoryId)?.category
        .name ?? "(カテゴリが見つからない？)", // undefinedにはならないはずなので適当なメッセージを設定
    [selectedItemCategoryId, taskList]
  );

  // ページ移動関連
  const router = useRouter();
  const navigateTaskPage = useCallback(
    (id: number) => {
      router.push(`/work-log/task/${id}`);
    },
    [router]
  );
  const navigateCategoryPage = useCallback(
    (id: number) => {
      router.push(`/work-log/category/?id=${id}`);
    },
    [router]
  );

  return {
    /** 選択中のアイテムがあるか(selectedIdの値に依存) */
    isItemSelected,
    /** 選択中のアイテムのタスクid */
    selectedItemTaskId,
    /** 選択中のアイテムのカテゴリーid */
    selectedItemCategoryId,
    /** 選択中のアイテムの稼働時間 */
    selectedItemHours,
    /** 選択中のタスクが完了済みかどうか(ダイアログの種類の分岐に利用) */
    isSelectedTaskCompleted,
    /** 選択中のアイテムのタスク名 */
    selectedTaskName,
    /** 選択中のアイテムのカテゴリ名 */
    selectedCategoryName,
    /** アイテムの行をクリックした際のハンドラー
    /** タスク詳細ページに飛ぶ */
    navigateTaskPage,
    /** カテゴリ詳細ページに飛ぶ */
    navigateCategoryPage,
  };
}
