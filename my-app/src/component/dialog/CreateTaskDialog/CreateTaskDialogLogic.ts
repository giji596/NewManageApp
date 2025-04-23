import apiClient from "@/lib/apiClient";
import { CategoryOption } from "@/type/Category";
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
  initialCategoryId: number;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
};

/**
 * タスクを新規作成するダイアログのロジック
 */
export default function CreateTaskDialogLogic({
  initialCategoryId,
  onClose,
}: Props) {
  // TODO:でーたふぇっちさせる
  const categoryList: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
    { id: 4, name: "カテゴリ4" },
  ];
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      categoryId: initialCategoryId,
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
        onClose();
        return res.body;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // エラーコードが400の場合は重複エラーであるとする
          if (error.response.status === 400) {
            setDuplicateError(true);
          }
        }
      }
    },
    [onClose]
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
