import { useCallback } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** タグ名 */
  tagName: string;
};

type Props = {
  /** タグ名の初期値 */
  defaultTagName: string;
  /** 編集状態から元の状態に戻るハンドラー */
  onFinishEdit: () => void;
};
/**
 * 編集時のタグのリストアイテムのコンポーネントのロジック
 */
export const EditTagItemLogic = ({ defaultTagName, onFinishEdit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<SubmitData>({
    defaultValues: { tagName: defaultTagName },
  });
  const isSendable = isDirty && isValid;
  const onSubmit = useCallback(
    async (data: SubmitData) => {
      const { tagName } = data;
      console.log("更新後の名前:", tagName); // TODO:ここでリクエスト
      // 更新後、編集状態を終了
      onFinishEdit();
    },
    [onFinishEdit]
  );
  return {
    /** RHFのコントロールオブジェクト */
    control,
    /** 送信可能条件(valid成功 + dirtyである) */
    isSendable,
    /** 送信時のハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
};
