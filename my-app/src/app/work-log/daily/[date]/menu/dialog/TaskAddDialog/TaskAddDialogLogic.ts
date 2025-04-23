import apiClient from "@/lib/apiClient";
import { TaskOption } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * タスク追加ダイアログのロジック
 */
export default function TaskAddDialogLogic() {
  // TODO:でーたふぇっちさせる
  const { data: categoryData, isLoading: isLoadingCategory } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get"
  );
  const categoryList = categoryData?.body;
  const taskList: TaskOption[] = [
    { id: 0, name: "タスクがありません" },
    { id: 1, name: "タスク1" },
    { id: 2, name: "タスク2" },
    { id: 3, name: "タスク3" },
    { id: 4, name: "タスク4" },
  ];
  const isLoading = isLoadingCategory;

  // TODO:初期値はデータフェッチ時に設定させるようにuseEffectで条件分岐を作成しておこなう
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

  // 初期化処理(カテゴリーのデータフェッチ時)
  useEffect(() => {
    if (categoryList) {
      setSelectedCategoryId(categoryList[0].id);
    }
  }, [categoryList]);

  const isNoCategory = useMemo(
    () => selectedCategoryId === 0,
    [selectedCategoryId]
  );
  const onChangeSelectedCategory = useCallback(async (e: SelectChangeEvent) => {
    const newValue = e.target.value;
    setSelectedCategoryId(Number(newValue));
    // TODO:カテゴリー変更時にタスクを再フェッチしてその後セットさせる
  }, []);

  const onChangeSelectedTask = useCallback((e: SelectChangeEvent) => {
    const newValue = e.target.value;
    setSelectedTaskId(Number(newValue));
  }, []);

  const handleAddDailyTask = useCallback(async () => {
    // TODO:BEにデータ送信(selectedCategoryIdとタスクのそれを送信して送る)
  }, []);
  return {
    /** カテゴリ一覧 */
    categoryList,
    /** タスク一覧 */
    taskList,
    /** ロード状態 */
    isLoading,
    /** 選択中のカテゴリID */
    selectedCategoryId,
    /** 選択中のタスクID */
    selectedTaskId,
    /** カテゴリデータがない場合(返ってくる値にid:0がある場合) カテゴリのセレクトとタスク追加ボタンのdisabled条件 */
    isNoCategory,
    /** 選択中のカテゴリーを変更する関数 */
    onChangeSelectedCategory,
    /** 選択中のタスクを変更する関数 */
    onChangeSelectedTask,
    /** 日付のタスクを追加する関数 */
    handleAddDailyTask,
  };
}
