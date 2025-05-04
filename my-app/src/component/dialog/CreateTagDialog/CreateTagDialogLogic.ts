import apiClient from "@/lib/apiClient";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  /** 閉じるハンドラー */
  onClose: () => void;
};

type SubmitData = {
  /** タグ名 */
  tagName: string;
};
/**
 * タグを作成するダイアログのロジック
 */
export const CreateTagDialogLogic = ({ onClose }: Props) => {
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SubmitData>({ defaultValues: { tagName: "" } });
  const isSendable = isDirty;

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      await apiClient.work_log.memos.tags.post({
        body: { tagName: data.tagName },
      });
      onClose();
      if (false) {
        setDuplicateError(true); // TODO:BE繋ぎ込み時に
      }
    },
    [onClose]
  );
  return {
    /** RHFのコントロールオブジェクト */
    control,
    /** 送信可能かどうか */
    isSendable,
    /** 送信ハンドラー */
    onSubmit: handleSubmit(onSubmit),
    /** 重複エラーの有無 */
    duplicateError,
  };
};
