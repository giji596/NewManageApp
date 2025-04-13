import { CategoryOption } from "@/type/Category";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** タスク名 */
  taskName: string;
  /** カテゴリid */
  categoryId: number;
  /** お気に入りか */
  isFavorite: boolean;
};

type Props = {
  /** タスク名の初期値 */
  initialTaskName: string;
  /** カテゴリidの初期値 */
  initialCategoryId: number;
  /** お気に入りの初期値 */
  initialIsFavorite: boolean;
};
/**
 * タスク詳細ページでタスクを編集するダイアログのロジック
 */
export default function TaskEditDialogLogic({
  initialTaskName,
  initialCategoryId,
  initialIsFavorite,
}: Props) {
  // TODO:ここでデータフェッチ
  const categoryList: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
    { id: 4, name: "カテゴリ4" },
  ];
  const isLoading = false;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      taskName: initialTaskName,
      categoryId: initialCategoryId,
      isFavorite: initialIsFavorite,
    }, // TODO: 初期値が必要
  });

  const onSubmit = useCallback(async (data: SubmitData) => {
    // TODO:ここで送信
    console.log("送信でーた", data);
  }, []);
  return {
    /** カテゴリの一覧 */
    categoryList,
    /* カテゴリ一覧のロード状態 */
    isLoading,
    /** RHFのコントロールオブジェクト(MUIのコンポーネントに必須) */
    control,
    /** バリデーションの可否 */
    isValid,
    /** データ送信するハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
}
