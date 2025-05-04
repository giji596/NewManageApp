import { useCallback } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** タグ名 */
  tagName: string;
};
/**
 * タグを作成するダイアログのロジック
 */
export const CreateTagDialogLogic = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SubmitData>({ defaultValues: { tagName: "" } });
  const isSendable = isDirty;

  const onSubmit = useCallback(async (data: SubmitData) => {
    console.log("でーた", data); // TODO:BE繋ぎ込み時に
  }, []);
  return {
    /** RHFのコントロールオブジェクト */
    control,
    /** 送信可能かどうか */
    isSendable,
    /** 送信ハンドラー */
    onSubmit: handleSubmit(onSubmit),
  };
};
