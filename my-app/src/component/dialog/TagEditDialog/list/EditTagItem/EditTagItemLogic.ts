import { useForm } from "react-hook-form";

type SubmitData = {
  /** タグ名 */
  tagName: string;
};

/**
 * 編集時のタグのリストアイテムのコンポーネントのロジック
 */
export const EditTagItemLogic = () => {
  const defaultTagName = "タグ1"; // TODO:親からもらう
  const { control } = useForm<SubmitData>({
    defaultValues: { tagName: defaultTagName },
  });
  return {
    /** RHFのコントロールオブジェクト */
    control,
  };
};
