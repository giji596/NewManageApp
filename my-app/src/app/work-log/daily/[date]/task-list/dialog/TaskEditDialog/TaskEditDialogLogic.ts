import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
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
  /** 進捗の初期選択の値 */
  initProgressRange: number;
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
  initProgressRange,
  onClose,
}: Props) {
  // ぱらめーた
  const { date } = useParams<{ date: string }>();
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  // 初期値保存(更新処理時に比較に仕様)
  const initialValues = useRef<{ taskId: number; dailyHours: number }>({
    taskId: initialTaskId,
    dailyHours: initialHours,
  });
  // 初期レンダーのフラグ(初期時にuseEffectで値を変更させない)
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const unSelected = categoryId === 0 || taskId === 0;
  const { data: categoryData, isLoading: isLoadingCategory } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get",
    {
      query: { displayRange: "all", hideCompleted: "true" },
      key: [
        "api/work-log/categories/options",
        "displayRange=all&hideCompleted=true",
      ],
    }
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
    if (taskList) {
      setTaskId((prev) => {
        // 初期化
        if (!hasInitialized) {
          setHasInitialized(true);
          return initialTaskId;
        }
        // カテゴリ変更時
        if (prev === null) return taskList[0].id;
        // 新規カテゴリ追加時
        const newId = newTaskIdRef.current;
        if (newId !== null) return newId;
        // hasInitialized=false かつ newId===nullの場合(初期化後の次のレンダー時の呼び出し時)
        return prev;
      });
    }
  }, [hasInitialized, initialTaskId, taskList]);
  // カテゴリidの初期化
  useEffect(() => {
    if (categoryList) {
      setCategoryId((prev) => {
        // 初期化
        if (prev === null) return initialCategoryId;
        // 新規カテゴリ追加時
        const newId = newCategoryIdRef.current;
        if (newId !== null) return newId;
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
    setDuplicateError(false); // 選択を変更時に重複エラーフラグをoffにする
  }, []);

  const onChangeSelectTask = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setTaskId(Number(target));
    setDuplicateError(false); // 選択を変更時に重複エラーフラグをoffにする
  }, []);

  const onChangeSelectHours = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setDailyHours(Number(target));
  }, []);

  // 進捗関連
  const [progress, setProgress] = useState<number>(initProgressRange);
  const handleChangeProgress = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === "number") setProgress(newValue);
    },
    []
  );

  const handleSave = useCallback(async () => {
    // 各stateの値について、初期値と一緒なら処理に含めない
    const body: Record<string, number> = {};
    if (initialValues.current.dailyHours !== dailyHours)
      body.workTime = dailyHours;
    if (initialValues.current.taskId !== taskId && taskId !== null)
      body.taskId = taskId;
    // bodyで必要な値だけ渡す
    try {
      await apiClient.work_log.daily
        ._date(date)
        .task_logs._id(itemId)
        .patch({ body: body });
      mutate(`api/work-log/daily/${date}`); // 再検証する
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // エラーコードが400の場合は重複エラーであるとする
        if (error.response.status === 400) {
          setDuplicateError(true);
        }
      }
    }
  }, [dailyHours, date, itemId, onClose, taskId]);
  const handleDelete = useCallback(async () => {
    await apiClient.work_log.daily._date(date).task_logs._id(itemId).delete();
    mutate(`api/work-log/daily/${date}`); // 再検証する
    onClose();
  }, [date, itemId, onClose]);

  const newTaskIdRef = useRef<number | null>(null);
  const newCategoryIdRef = useRef<number | null>(null);
  const onCreateTask = useCallback((newTaskId: number) => {
    newTaskIdRef.current = newTaskId;
  }, []);
  const onCreateCategory = useCallback((newCategoryId: number) => {
    newCategoryIdRef.current = newCategoryId;
    setTaskId(null); // タスクidを初期化する(初期化後自動的にidはセットされる)
  }, []);
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
    /** 重複エラー */
    duplicateError,
    /** タスクの選択が有効かどうか(taskListの有無+選択値のidがtaskListに存在するかで判別) */
    isTaskSelectAvailable,
    /** 選択したカテゴリーに変更するハンドラー */
    onChangeSelectCategory,
    /** 選択したタスクに変更するハンドラー */
    onChangeSelectTask,
    /** 選択した稼働時間に変更するハンドラー */
    onChangeSelectHours,
    /** 進捗 */
    progress,
    /** 進捗を変えるハンドラー */
    handleChangeProgress,
    /** 編集を保存するハンドラー */
    handleSave,
    /** デリートのイベント */
    handleDelete,
    /** タスク追加時の処理 */
    onCreateTask,
    /** カテゴリ追加時の処理 */
    onCreateCategory,
  };
}
