import { useForm } from "react-hook-form";

export type SubmitTagData = {
  /** タグ名 */
  tagName: string;
};

type Props = {
  /** タグ名の初期値 */
  defaultTagName: string;
};
/**
 * 編集時のタグのリストアイテムのコンポーネントのロジック
 */
export const EditTagItemLogic = ({ defaultTagName }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<SubmitTagData>({
    defaultValues: { tagName: defaultTagName },
  });
  const isSendable = isDirty && isValid;

  return {
    /** RHFのコントロールオブジェクト */
    control,
    /** 送信可能条件(valid成功 + dirtyである) */
    isSendable,
    /** 送信時のバリデーション */
    handleSubmit,
  };
};
