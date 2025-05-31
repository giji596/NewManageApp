import { localClient } from "@/lib/localClient";
import { CategoryOption } from "@/type/Category";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

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
  const { id } = useParams<{ id: string }>();
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const { data, isLoading } = useSWR(
    ["api/work-log/categories/options", "displayRange=all&hideCompleted=true"],
    localClient.work_log.categories.options.get({
      query: { displayRange: "all", hideCompleted: "true" },
    })
  );
  const categoryList: CategoryOption[] = data ?? [];

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      taskName: initialTaskName,
      categoryId: initialCategoryId,
      isFavorite: initialIsFavorite,
    },
  });

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      const sendData: Record<string, string | number | boolean> = {};
      if (initialTaskName !== data.taskName) sendData.taskName = data.taskName;
      if (initialCategoryId !== data.categoryId)
        sendData.categoryId = data.categoryId;
      if (initialIsFavorite !== data.isFavorite)
        sendData.isFavorite = data.isFavorite;
      try {
        await localClient.work_log.tasks._id(Number(id)).patch({
          body: sendData,
        });
        // 再検証
        // このページについて
        mutate(`api/work-log/tasks/${id}`);
        // 一覧データについて
        mutate(
          (key) => Array.isArray(key) && key[0] === "api/work-log/tasks",
          undefined // キャッシュを削除(一覧データではキャッシュがある場合利用する設定であるので)
        );
        onClose();
      } catch (error) {
        // 重複エラーであるかメッセージで判定
        if (error instanceof Error && error.message === "duplicate error") {
          // エラーメッセージ表示
          setDuplicateError(true);
        }
      }
    },
    [id, initialCategoryId, initialIsFavorite, initialTaskName, onClose]
  );
  return {
    /** カテゴリの一覧 */
    categoryList,
    /* カテゴリ一覧のロード状態 */
    isLoading,
    /** 重複エラー */
    duplicateError,
    /** RHFのコントロールオブジェクト(MUIのコンポーネントに必須) */
    control,
    /** バリデーションの可否 */
    isValid,
    /** データ送信するハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
}
