import { CategoryOption } from "@/type/Category";
import { useCallback } from "react";

type Props = {
  /** 閉じるイベント */
  onClose: () => void;
  /** 変更前のカテゴリ */
  category: CategoryOption;
};

/**
 * カテゴリ名を編集するダイアログロジック
 */
export const CategoryNameEditDialogLogic = ({ onClose, category }: Props) => {
  const onSubmit = useCallback(async () => {
    // TODO:ここでリクエスト
    console.log("保存対象", category.id);
    onClose();
  }, [category.id, onClose]);

  return {
    /** 保存時のハンドラー(カテゴリ名を変更する) */
    onSubmit,
  };
};
