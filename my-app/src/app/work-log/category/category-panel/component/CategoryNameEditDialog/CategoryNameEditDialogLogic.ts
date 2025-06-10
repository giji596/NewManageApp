import { localClient } from "@/lib/localClient";
import { CategoryOption } from "@/type/Category";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

type Props = {
  /** 閉じるイベント */
  onClose: () => void;
  /** 変更前のカテゴリ */
  category: CategoryOption;
};

type SubmitData = {
  /** 新しいカテゴリ名 */
  name: string;
};
/**
 * カテゴリ名を編集するダイアログロジック
 */
export const CategoryNameEditDialogLogic = ({ onClose, category }: Props) => {
  const [duplicateError, setDuplicateError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: { name: category.name },
  });
  const onSubmit = useCallback(
    async (data: SubmitData) => {
      setDuplicateError(false);
      const body = { name: data.name };
      try {
        await localClient.work_log.categories
          ._id(category.id)
          .name.patch({ body });
        // 再検証
        // 選択賜データ
        await mutate(
          (key) =>
            Array.isArray(key) && key[0] === "api/work-log/categories/options"
        );
        // 比較データ
        await mutate(
          (key) =>
            Array.isArray(key) &&
            key[0] === "api/work-log/categories/comparison"
        );
        onClose();
      } catch (e) {
        if (e instanceof Error && e.message === "duplicate error")
          setDuplicateError(true);
      }
    },
    [category.id, onClose]
  );

  return {
    /** 重複エラー状態 */
    duplicateError,
    /** 保存時のハンドラー(カテゴリ名を変更する) */
    onSubmit: handleSubmit(onSubmit),
    /** フォームコントロール */
    control,
    /** フォームの有効状態 */
    isValid,
  };
};
