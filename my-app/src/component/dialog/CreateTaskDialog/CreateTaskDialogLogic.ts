import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

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
  // TODO:でーたふぇっちさせる
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    query: { displayRange: "all", hideCompleted: "true" },
    key: ["api/work-log/categories/options"],
  });
  const categoryList = data?.body;
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
        const res = await apiClient.work_log.tasks.post({
          body: {
            name: data.taskName,
            categoryId: data.categoryId,
            isFavorite: data.isFavorite,
          },
        });
        mutate(`api/work-log/tasks/options?categoryId=${data.categoryId}`);
        onCreateTask?.(res.body.id);
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // エラーコードが400の場合は重複エラーであるとする
          if (error.response.status === 400) {
            setDuplicateError(true);
          }
        }
      }
    },
    [onClose, onCreateTask]
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
