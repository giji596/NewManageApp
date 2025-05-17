import { useForm } from "react-hook-form";

type SubmitData = {
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
  const { control } = useForm<SubmitData>({
    defaultValues: { tagName: defaultTagName },
  });
  return {
    /** RHFのコントロールオブジェクト */
    control,
  };
};
