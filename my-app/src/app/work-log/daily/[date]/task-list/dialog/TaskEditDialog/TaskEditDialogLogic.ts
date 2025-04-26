import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリidの初期選択の値 */
  initialCategoryId: number;
  /** タスクidの初期選択の値 */
  initialTaskId: number;
  /** 稼働時間の初期選択の値 */
  initialHours: number;
};

/**
 * 日付詳細ページ タスク編集ダイアログのロジック部分
 */
export default function TaskEditDialogLogic({
  itemId,
  initialCategoryId,
  initialTaskId,
  initialHours,
}: Props) {
  // ぱらめーた
  const { date } = useParams<{ date: string }>();
  // 初期値保存(更新処理時に比較に仕様)
  const initialValues = useRef<{ taskId: number; dailyHours: number }>({
    taskId: initialTaskId,
    dailyHours: initialHours,
  });
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId);
  const [taskId, setTaskId] = useState<number | null>(initialTaskId);
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const unSelected = categoryId === 0 || taskId === 0;
  const { data: categoryData } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get",
    { key: "api/work-log/categories/options" }
  );
  const categoryList = categoryData?.body;
  const { data: taskData } = useAspidaSWR(
    apiClient.work_log.tasks.options,
    "get",
    {
      key: `api/work-log/tasks/options?categoryId=${categoryId}`,
      query: { categoryId: categoryId ?? 0 }, // null時に0与えてるけどenabledでフェッチできないようにしてるので実際はフェッチされない
      enabled: categoryId !== null, // カテゴリのフェッチ前にフェッチさせない
    }
  );
  const taskList = taskData?.body;
  useEffect(() => {
    if (taskList) {
      setTaskId(taskList[0].id);
    }
  }, [taskList]);
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

  // TODO:バックエンドに送信
  const handleSave = useCallback(() => {
    console.log("せーぶ！ id:", itemId);
  }, [itemId]);
  const handleDelete = useCallback(() => {
    console.log("さくじょ！ id:", itemId);
  }, [itemId]);
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
