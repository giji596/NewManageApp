import { CategoryOption } from "@/type/Category";

/**
 * タスク詳細ページでタスクを編集するダイアログのロジック
 */
export default function TaskEditDialogLogic() {
  // TODO:ここでデータフェッチ
  const categoryList: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
    { id: 4, name: "カテゴリ4" },
  ];
  const isLoading = false;

  return {
    /** カテゴリの一覧 */
    categoryList,
    /* カテゴリ一覧のロード状態 */
    isLoading,
  };
}
