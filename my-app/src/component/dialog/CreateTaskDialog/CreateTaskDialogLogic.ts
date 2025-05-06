import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "next/navigation";
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
  // パスパラメータ取得
  const pathParam = useParams();
  const dateParam = pathParam.date; // string | string[] | undefined
  const getStartDate = useCallback(
    () =>
      typeof dateParam === "string"
        ? dateParam // stringの場合はその値を(/[date]/の形式である)
        : format(new Date(), "yyyy-MM-dd"), // undefinedの場合は今日の日付(string[]の場合は[...date]とした場合のみなのでならない))
    [dateParam]
  );
  // TODO:でーたふぇっちさせる
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    key: "api/work-log/categories/options",
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
            startDate: getStartDate(),
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
    [getStartDate, onClose, onCreateTask]
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
