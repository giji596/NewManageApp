import apiClient from "@/lib/apiClient";
import { CategoryOption } from "@/type/Category";
import useAspidaSWR from "@aspida/swr";
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
  /** 閉じるハンドラー */
  onClose: () => void;
};
/**
 * タスク詳細ページでタスクを編集するダイアログのロジック
 */
export default function TaskEditDialogLogic({
  initialTaskName,
  initialCategoryId,
  initialIsFavorite,
  onClose,
}: Props) {
  const { data, isLoading } = useAspidaSWR(
    apiClient.work_log.categories.options,
    "get",
    { key: "api/work-log/categories/options" }
  );
  const categoryList: CategoryOption[] = data?.body ?? [];

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

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      // TODO:ここで送信
      console.log("送信でーた", data);
      onClose();
    },
    [onClose]
  );
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
