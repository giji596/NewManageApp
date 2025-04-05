import { CategoryOption } from "@/type/Category";
import { TaskOption } from "@/type/Task";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** カテゴリidの初期選択の値 */
  initialCategoryId: number;
  /** タスクidの初期選択の値 */
  initialTaskId: number;
};

/**
 * 日付詳細ページ タスク編集ダイアログのロジック部分
 */
export default function TaskEditDialogLogic({
  itemId,
  initialCategoryId,
  initialTaskId,
}: Props) {
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId);
  const [taskId, setTaskId] = useState<number>(initialTaskId);
  const unSelected = categoryId === 0 || taskId === 0;

  // TODO:データフェッチ行う
  const categoryList: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
  ];
  const taskList: TaskOption[] = [
    { id: 0, name: "未選択" },
    { id: 1, name: "タスク1" },
    { id: 2, name: "タスク2" },
    { id: 3, name: "タスク3" },
    { id: 4, name: "タスク4" },
    { id: 5, name: "タスク5" },
    { id: 6, name: "タスク6" },
  ];
  const onChangeSelectCategory = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setCategoryId(Number(target));
    setTaskId(0);
  }, []);

  const onChangeSelectTask = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setTaskId(Number(target));
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
    /** 対象を選択していない状態 */
    unSelected,
    /** カテゴリ一覧 */
    categoryList,
    /** タスク一覧(カテゴリを変更時には再度取得する必要あり) */
    taskList,
    /** 選択したカテゴリーに変更するハンドラー */
    onChangeSelectCategory,
    /** 選択したタスクに変更するハンドラー */
    onChangeSelectTask,
    /** 編集を保存するハンドラー */
    handleSave,
    /** デリートのイベント */
    handleDelete,
  };
}
