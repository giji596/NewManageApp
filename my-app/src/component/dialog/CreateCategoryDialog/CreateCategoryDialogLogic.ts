import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** カテゴリ名 */
  name: string;
};

/**
 * 新規カテゴリを作成するダイアログのロジック
 */
export default function CreateCategoryDialogLogic() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({ defaultValues: { name: "" } });
  const [duplicateError, setDuplicateError] = useState<boolean>();

  const onSubmit = useCallback(async (data: SubmitData) => {
    try {
      // TODO:BEにリクエストを送る
      console.log("新規カテゴリ", data);
      // TODO:ここでレスポンスを検証して、必要であればエラーをthrowする
    } catch (error) {
      console.log("カテゴリ作成エラー", error);
      // TODO:重複時に想定しているエラーと合致していた場合、フラグをonにする
      if (error) {
        setDuplicateError(true);
      }
    }
  }, []);

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
