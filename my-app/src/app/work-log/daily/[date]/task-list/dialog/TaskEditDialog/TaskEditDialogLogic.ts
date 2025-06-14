import { localClient } from "@/lib/localClient";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";

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
  /** 関連メモの削除確認ダイアログ */
  onOpenDeleteMemo: () => void;
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
  onOpenDeleteMemo,
}: Props) {
  // ぱらめーた
  const { date } = useParams<{ date: string }>();
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  // 初期レンダーのフラグ(初期時にuseEffectで値を変更させない)
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [memoTitles, setMemoTitles] = useState<string[] | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const unSelected = categoryId === 0 || taskId === 0;
  const { data: categoryData, isLoading: isLoadingCategory } = useSWR(
    ["api/work-log/categories/options", "displayRange=all&hideCompleted=true"],
    localClient.work_log.categories.options.get({
      query: { displayRange: "all", hideCompleted: "true" },
    })
  );
  // ログからタスク一覧を取得
  const { data: logData } = useSWR(
    `api/work-log/daily/${date}`,
    localClient.work_log.daily._date(date).get()
  );
  const usedTaskIdList = logData?.taskList
    .filter((v) => v.id !== itemId) // ここで自身を除外して同じタスクなら変更先に含める
    .map((v) => v.task.id);
  const categoryList = categoryData;
  const { data: taskData, isLoading: isLoadingTask } = useSWR(
    categoryId
      ? ["api/work-log/tasks/options", `categoryId=${categoryId}`]
      : null, // カテゴリフェッチ前はフェッチさせない
    localClient.work_log.tasks.options.get({
      query: { categoryId: categoryId ?? 0 },
    })
  );

  const taskList = useMemo(() => {
    const data = taskData?.filter((v) => !usedTaskIdList?.includes(v.id));
    if (data && data.length === 0)
      return [{ id: 0, name: "タスクがありません" }];
    return data;
  }, [taskData, usedTaskIdList]);
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
  // データフェッチ
  const { data: progressData, isLoading: isLoadingProgress } = useSWR(
    taskId ? `api/work-log/tasks/${taskId}/progress` : null,
    localClient.work_log.tasks._id(taskId ?? 0).progress.get() // id:nullの場合は下記でフェッチ抑制してるので適当な値を
  );
  const initProgress = progressData?.progress;
  const [progress, setProgress] = useState<number | null>(null);
  const isBecomeComplete = useMemo(() => progress === 100, [progress]);
  const handleChangeProgress = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === "number") setProgress(newValue);
    },
    []
  );
  // 進捗の初期化処理(タスク変更時も)
  useEffect(() => {
    const fetchProgressData = progressData?.progress;
    if (fetchProgressData !== undefined) {
      setProgress(fetchProgressData);
    }
  }, [progressData]); // 依存値をオブジェクトにして前後データが同じprogressであった場合も更新する

  const handleSave = useCallback(async () => {
    // 各stateの値について、初期値と一緒なら処理に含めない
    const body: Record<string, number> = {};
    if (initialHours !== dailyHours) body.workTime = dailyHours;
    if (initialTaskId !== taskId && taskId !== null) body.taskId = taskId;
    if (initProgress !== progress && progress !== null)
      body.progress = progress;
    // bodyで必要な値だけ渡す
    try {
      await localClient.work_log.daily
        ._date(date)
        .task_logs._id(itemId)
        .patch({ body: body });
      mutate(`api/work-log/daily/${date}`); // 再検証する
      if (progress === 100)
        mutate(
          (key) =>
            Array.isArray(key) &&
            key[0] == "api/work-log/tasks/options" &&
            key[1] == `categoryId=${categoryId}`
        ); // 完了状態にする場合はタスクの一覧も再検証
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // エラーコードが400の場合は重複エラーであるとする
        if (error.response.status === 400) {
          setDuplicateError(true);
        }
      }
    }
  }, [
    categoryId,
    dailyHours,
    date,
    initProgress,
    initialHours,
    initialTaskId,
    itemId,
    onClose,
    progress,
    taskId,
  ]);

  const onDelete = useCallback(async () => {
    await localClient.work_log.daily._date(date).task_logs._id(itemId).delete();
    mutate(`api/work-log/daily/${date}`); // 再検証する
    onClose();
  }, [date, itemId, onClose]);
  const handleDelete = useCallback(async () => {
    // ログの関連メモを取得
    const logMemoTitles = await localClient.work_log.daily
      ._date(date)
      .task_logs._id(itemId)
      .memos.titles.get()();
    // 関連メモがなければ直接削除可能
    if (logMemoTitles === null) {
      await onDelete();
    } else {
      // 関連メモがある場合
      setMemoTitles(logMemoTitles);
      onOpenDeleteMemo();
    }
  }, [date, itemId, onDelete, onOpenDeleteMemo]);

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
    /** メモのタイトル一覧(削除時に表示) */
    memoTitles,
    /** カテゴリ一覧 */
    categoryList,
    /** タスク一覧(カテゴリを変更時には再度取得する必要あり) */
    taskList,
    /** ロード状態(SWRのロード または 選択中の値がnull以外(=初期化済み)) */
    isLoading,
    /** progressのロード状態 */
    isLoadingProgress,
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
    /** 進捗の更新後の値が完了状態(100%)かどうか */
    isBecomeComplete,
    /** 進捗を変えるハンドラー */
    handleChangeProgress,
    /** 編集を保存するハンドラー */
    handleSave,
    /** 削除の処理(delete -> mutate -> onClose) */
    onDelete,
    /** デリートのイベント */
    handleDelete,
    /** タスク追加時の処理 */
    onCreateTask,
    /** カテゴリ追加時の処理 */
    onCreateCategory,
  };
}
