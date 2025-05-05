import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mutate } from "swr";

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリidの初期選択の値 */
  initialCategoryId: number;
  /** タスクidの初期選択の値 */
  initialTaskId: number;
  /** 稼働時間の初期選択の値 */
  initialHours: number;
  /** ダイアログ閉じるイベント */
  onClose: () => void;
};

/**
 * 日付詳細ページ タスク編集ダイアログのロジック部分
 */
export default function TaskEditDialogLogic({
  itemId,
  initialCategoryId,
  initialTaskId,
  initialHours,
  onClose,
}: Props) {
  // ぱらめーた
  const { date } = useParams<{ date: string }>();
  // 初期値保存(更新処理時に比較に仕様)
  const initialValues = useRef<{ taskId: number; dailyHours: number }>({
    taskId: initialTaskId,
    dailyHours: initialHours,
  });
  // 初期レンダーのフラグ(初期時にuseEffectで値を変更させない)
  const firstRender = useRef<boolean>(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const unSelected = categoryId === 0 || taskId === 0;
  const { data: categoryData, isLoading: isLoadingCategory } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get",
    { key: "api/work-log/categories/options" }
  );
  const categoryList = categoryData?.body;
  const { data: taskData, isLoading: isLoadingTask } = useAspidaSWR(
    apiClient.work_log.tasks.options,
    "get",
    {
      key: `api/work-log/tasks/options?categoryId=${categoryId}`,
      query: { categoryId: categoryId ?? 0 }, // null時に0与えてるけどenabledでフェッチできないようにしてるので実際はフェッチされない
      enabled: categoryId !== null, // カテゴリのフェッチ前にフェッチさせない
    }
  );
  const taskList = taskData?.body;
  const isLoading = useMemo(
    () =>
      // SWRのロード状態
      isLoadingCategory ||
      isLoadingTask ||
      // 値がセットされてない場合もロード中として扱う
      categoryId === null ||
      taskId === null,
    [categoryId, isLoadingCategory, isLoadingTask, taskId]
  );
  useEffect(() => {
    // 最初のレンダー時は処理しない(初期値を使用させる)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (taskList) {
      setTaskId((prev) => {
        if (prev === null) return initialTaskId;
        return prev;
      });
    }
  }, [initialTaskId, taskList]);
  // カテゴリidの初期化
  useEffect(() => {
    if (categoryList) {
      setCategoryId((prev) => {
        if (prev === null) return initialCategoryId;
        return prev;
      });
    }
  }, [categoryList, initialCategoryId]);
  const isTaskSelectAvailable = useMemo(
    () => taskList && taskList.some((v) => v.id === taskId),
    [taskId, taskList]
  );
  const onChangeSelectCategory = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setCategoryId(Number(target));
    setTaskId(null);
  }, []);

  const onChangeSelectTask = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setTaskId(Number(target));
  }, []);

  const onChangeSelectHours = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setDailyHours(Number(target));
  }, []);

  const handleSave = useCallback(async () => {
    // 各stateの値について、初期値と一緒なら処理に含めない
    const body: Record<string, number> = {};
    if (initialValues.current.dailyHours !== dailyHours)
      body.workTime = dailyHours;
    if (initialValues.current.taskId !== taskId && taskId !== null)
      body.taskId = taskId;
    // bodyで必要な値だけ渡す
    await apiClient.work_log.daily
      ._date(date)
      .task_logs._id(itemId)
      .patch({ body: body });
    mutate(`api/work-log/daily/${date}`); // 再検証する
    onClose();
  }, [dailyHours, date, itemId, onClose, taskId]);
  const handleDelete = useCallback(async () => {
    await apiClient.work_log.daily._date(date).task_logs._id(itemId).delete();
    mutate(`api/work-log/daily/${date}`); // 再検証する
    onClose();
  }, [date, itemId, onClose]);
  return {
    /** 選択中のカテゴリーのid */
    categoryId,
    /** 選択中のタスクのid */
    taskId,
    /** 洗濯中の稼働時間 */
    dailyHours,
    /** 対象を選択していない状態 */
    unSelected,
    /** カテゴリ一覧 */
    categoryList,
    /** タスク一覧(カテゴリを変更時には再度取得する必要あり) */
    taskList,
    /** ロード状態(SWRのロード または 選択中の値がnull以外(=初期化済み)) */
    isLoading,
    /** タスクの選択が有効かどうか(taskListの有無+選択値のidがtaskListに存在するかで判別) */
    isTaskSelectAvailable,
    /** 選択したカテゴリーに変更するハンドラー */
    onChangeSelectCategory,
    /** 選択したタスクに変更するハンドラー */
    onChangeSelectTask,
    /** 選択した稼働時間に変更するハンドラー */
    onChangeSelectHours,
    /** 編集を保存するハンドラー */
    handleSave,
    /** デリートのイベント */
    handleDelete,
  };
}
