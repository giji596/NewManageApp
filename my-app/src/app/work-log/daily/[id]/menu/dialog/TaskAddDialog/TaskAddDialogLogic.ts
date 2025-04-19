import { CategoryOption } from "@/type/Category";
import { TaskOption } from "@/type/Task";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";

/**
 * タスク追加ダイアログのロジック
 */
export default function TaskAddDialogLogic() {
  // TODO:でーたふぇっちさせる
  const categoryList: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
    { id: 4, name: "カテゴリ4" },
  ];
  const taskList: TaskOption[] = [
    { id: 0, name: "タスクがありません" },
    { id: 1, name: "タスク1" },
    { id: 2, name: "タスク2" },
    { id: 3, name: "タスク3" },
    { id: 4, name: "タスク4" },
  ];
  const isLoading = false;

  // TODO:初期値はデータフェッチ時に設定させるようにuseEffectで条件分岐を作成しておこなう
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

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
    /** 選択中のカテゴリーを変更する関数 */
    onChangeSelectedCategory,
    /** 選択中のタスクを変更する関数 */
    onChangeSelectedTask,
    /** 日付のタスクを追加する関数 */
    handleAddDailyTask,
  };
}
