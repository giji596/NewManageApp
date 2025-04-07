import { CategoryOption } from "@/type/Category";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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
        // TODO:POSTリクエスト送る
        console.log("でーた", data);
        // TODO: ここでエラーハンドリング(response.okとかで)
        if (true) {
          onClose();
        } else {
          throw new Error();
        }
      } catch (error) {
        // TODO:エラーの内容があらかじめ設定したものであればset
        if (error) setDuplicateError(true);
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
