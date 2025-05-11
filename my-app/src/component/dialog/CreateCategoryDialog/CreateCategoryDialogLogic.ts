import apiClient from "@/lib/apiClient";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

type SubmitData = {
  /** カテゴリ名 */
  name: string;
};

type Props = {
  /** ダイアログを閉じる関数 */
  onClose: () => void;
  /** カテゴリ作成時のロジック(親で処理が必要な場合のみ) */
  onCreateCategory?: (newTaskId: number) => void;
};
/**
 * 新規カテゴリを作成するダイアログのロジック
 */
export default function CreateCategoryDialogLogic({
  onClose,
  onCreateCategory,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({ defaultValues: { name: "" } });
  const [duplicateError, setDuplicateError] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      try {
        const res = await apiClient.work_log.categories.post({
          body: { name: data.name },
        });
        mutate(
          (key) =>
            Array.isArray(key) && key[0] === "api/work-log/categories/options"
        );
        onCreateCategory?.(res.body.id);
        onClose();
      } catch (error) {
        // AxiosErrorの場合
        if (axios.isAxiosError(error) && error.response) {
          // エラーコードが400の場合は重複エラーであるとする
          if (error.response.status === 400) {
            setDuplicateError(true);
          }
        }
      }
    },
    [onClose, onCreateCategory]
  );

  return {
    /** RHFのコントロールオブジェクト(MUIコンポーネント管理に必須) */
    control,
    /** フォームの入力に関するバリデーションの可否 */
    isValid,
    /** リクエスト時の重複時のレスポンスエラー(boolean) */
    duplicateError,
    /** 送信のハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
}
