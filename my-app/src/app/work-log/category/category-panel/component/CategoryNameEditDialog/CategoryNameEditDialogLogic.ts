import { CategoryOption } from "@/type/Category";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

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
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: { name: category.name },
  });
  const onSubmit = useCallback(async () => {
    // TODO:ここでリクエスト
    console.log("保存対象", category.id);
    onClose();
  }, [category.id, onClose]);

  return {
    /** 保存時のハンドラー(カテゴリ名を変更する) */
    onSubmit: handleSubmit(onSubmit),
    /** フォームコントロール */
    control,
    /** フォームの有効状態 */
    isValid,
  };
};
