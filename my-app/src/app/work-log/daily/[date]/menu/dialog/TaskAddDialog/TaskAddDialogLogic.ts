import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mutate } from "swr";

type Props = {
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * タスク追加ダイアログのロジック
 */
export default function TaskAddDialogLogic({ onClose }: Props) {
  // パスパラメータ
  const { date } = useParams<{ date: string }>();
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  // TODO:初期値はデータフェッチ時に設定させるようにuseEffectで条件分岐を作成しておこなう
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const { data: categoryData, isLoading: isLoadingCategory } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get",
    { key: ["api/work-log/categories/options"] }
  );
  const categoryList = categoryData?.body;
  const { data: taskData, isLoading: isLoadingTask } = useAspidaSWR(
    apiClient.work_log.tasks.options,
    "get",
    {
      key: `api/work-log/tasks/options?categoryId=${selectedCategoryId}`,
      query: { categoryId: selectedCategoryId ?? 0 }, // null時に0与えてるけどenabledでフェッチできないようにしてるので実際はフェッチされない
      enabled: selectedCategoryId !== null, // カテゴリのフェッチ前にフェッチさせない
    }
  );
  const taskList = taskData?.body;
  const isLoading = isLoadingCategory || isLoadingTask;
  // 初期化処理(カテゴリーのデータフェッチ時)
  useEffect(() => {
    if (categoryList) {
      setSelectedCategoryId((prev) => {
        // 初期化処理(null時)
        if (prev === null) return categoryList[0].id;
        // 新規カテゴリ追加時
        const newId = newCategoryIdRef.current;
        if (newId !== null) return newId;
        // 上記どちらでもない場合はprevを返して再レンダーしない
        return prev;
      });
    }
  }, [categoryList]);
  // タスク - 初期化及びカテゴリー変更時に呼び出し(keyが変更されてtaskListが更新されるため)
  useEffect(() => {
    if (taskList) {
      setSelectedTaskId((prev) => {
        // 初期化処理(null時 -> 最初及びカテゴリ変更時)
        if (prev === null) return taskList[0].id;
        // 新規カテゴリ追加時
        const newId = newTaskIdRef.current;
        if (newId !== null) return newId;

        // 上記どちらでもない場合はprevを返して再レンダーしない
        return prev;
      });
    }
  }, [taskList]);

  const isNoCategory = useMemo(
    () => selectedCategoryId === 0,
    [selectedCategoryId]
  );
  const isNoTask = useMemo(() => selectedTaskId === 0, [selectedTaskId]);
  const onChangeSelectedCategory = useCallback(
    async (e: SelectChangeEvent) => {
      const newValue = Number(e.target.value);
      if (newValue === selectedCategoryId) return; // 元と同じ値であれば早期return
      setSelectedCategoryId(newValue);
      setSelectedTaskId(null); // タスクidをnullにセットしてSelectを非表示に(再度フェッチ時に自動でidはセットされる)
      setDuplicateError(false); // 選択を変更時に重複エラーフラグをoffにする
    },
    [selectedCategoryId]
  );

  const onChangeSelectedTask = useCallback((e: SelectChangeEvent) => {
    const newValue = e.target.value;
    setSelectedTaskId(Number(newValue));
    setDuplicateError(false); // 選択を変更時に重複エラーフラグをoffにする
  }, []);

  const handleAddDailyTask = useCallback(async () => {
    try {
      if (selectedTaskId !== null) {
        await apiClient.work_log.daily
          ._date(date)
          .task_logs.post({ body: { taskId: selectedTaskId } });
        mutate(`api/work-log/daily/${date}`); // 再検証する
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // エラーコードが400の場合は重複エラーであるとする
        if (error.response.status === 400) {
          setDuplicateError(true);
        }
      }
    }
  }, [date, onClose, selectedTaskId]);
  const newTaskIdRef = useRef<number | null>(null);
  const newCategoryIdRef = useRef<number | null>(null);
  const onCreateTask = useCallback((newTaskId: number) => {
    newTaskIdRef.current = newTaskId;
  }, []);
  const onCreateCategory = useCallback((newCategoryId: number) => {
    newCategoryIdRef.current = newCategoryId;
    setSelectedTaskId(null); // タスクidを初期化する(初期化後自動的にidはセットされる)
  }, []);

  console.log("タスク表示関連", { isLoading, taskList, selectedTaskId });
  return {
    /** カテゴリ一覧 */
    categoryList,
    /** タスク一覧 */
    taskList,
    /** ロード状態 */
    isLoading,
    /** 重複エラー */
    duplicateError,
    /** 選択中のカテゴリID */
    selectedCategoryId,
    /** 選択中のタスクID */
    selectedTaskId,
    /** カテゴリデータがない場合(返ってくる値にid:0がある場合) カテゴリのセレクトとタスク追加ボタンのdisabled条件 */
    isNoCategory,
    /** タスクデータがない場合(返ってくる値にid:0がある場合) タスクのセレクトのdisabled条件 */
    isNoTask,
    /** 選択中のカテゴリーを変更する関数 */
    onChangeSelectedCategory,
    /** 選択中のタスクを変更する関数 */
    onChangeSelectedTask,
    /** 日付のタスクを追加する関数 */
    handleAddDailyTask,
    /** タスク追加時の処理 */
    onCreateTask,
    /** カテゴリ追加時の処理 */
    onCreateCategory,
  };
}
