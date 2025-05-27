import { localClient } from "@/lib/localClient";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

type SubmitData = {
  /** カテゴリID */
  categoryId: number;
  /** タスク名 */
  taskName: string;
  /** お気に入りにするか */
  isFavorite: boolean;
};

type Props = {
  /** カテゴリidの初期値 */
  categoryId?: number;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
  /** タスク作成時のロジック(親で処理が必要な場合のみ) */
  onCreateTask?: (newTaskId: number) => void;
};

/**
 * タスクを新規作成するダイアログのロジック
 */
export default function CreateTaskDialogLogic({
  categoryId,
  onClose,
  onCreateTask,
}: Props) {
  const { data } = useSWR(
    ["api/work-log/categories/options", "displayRange=all&hideCompleted=true"],
    localClient.work_log.categories.options.get({
      query: { displayRange: "all", hideCompleted: "true" },
    })
  );
  const categoryList = data;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      categoryId: categoryId ?? 1,
      taskName: "",
      isFavorite: false,
    },
  });
  const [duplicateError, setDuplicateError] = useState<boolean>();
  const onSubmit = useCallback(
    async (data: SubmitData) => {
      try {
        const res = await localClient.work_log.tasks.post({
          body: {
            name: data.taskName,
            categoryId: data.categoryId,
            isFavorite: data.isFavorite,
          },
        });
        await mutate(
          (key) =>
            Array.isArray(key) &&
            key[0] == "api/work-log/tasks/options" &&
            key[1] == `categoryId=${data.categoryId}`
        );
        await mutate(`api/work-log/categories/${categoryId}/tasks`); // 追加先のカテゴリのタスクも再検証する
        // 一覧データについて
        await mutate(
          (key) => Array.isArray(key) && key[0] === "api/work-log/tasks",
          undefined // キャッシュを削除(一覧データではキャッシュがある場合利用する設定であるので)
        );
        onCreateTask?.(res.id);
        onClose();
      } catch (error) {
        // 重複エラーであるかメッセージで判定
        if (error instanceof Error && error.message === "duplicate error") {
          // エラーメッセージ表示
          setDuplicateError(true);
        }
      }
    },
    [categoryId, onClose, onCreateTask]
  );

  return {
    /** カテゴリの一覧 */
    categoryList,
    /** RHFのコントロールオブジェクト(MUIコンポーネントに必須) */
    control,
    /** フォームのバリデーション(タスク名の必須だけ？かな) */
    isValid,
    /** 重複エラー(同じカテゴリーに同じタスクがある場合のエラー) */
    duplicateError,
    /** 確定時のハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
}
