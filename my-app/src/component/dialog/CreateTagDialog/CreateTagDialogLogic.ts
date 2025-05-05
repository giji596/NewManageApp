import apiClient from "@/lib/apiClient";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

type Props = {
  /** 閉じるハンドラー */
  onClose: () => void;
  /** タグ作成後に呼び出しする関数(親で必要な場合のみ) */
  onCreateTag?: (newId: number) => void;
};

type SubmitData = {
  /** タグ名 */
  tagName: string;
};
/**
 * タグを作成するダイアログのロジック
 */
export const CreateTagDialogLogic = ({ onClose, onCreateTag }: Props) => {
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SubmitData>({ defaultValues: { tagName: "" } });
  const isSendable = isDirty;

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      try {
        // ここでリクエスト エラーがあればonCloseせずにcatchする
        const res = await apiClient.work_log.memos.tags.post({
          body: { tagName: data.tagName },
        });
        mutate("api/work-log/memos/tags");
        onCreateTag?.(res.body.id); // 渡された場合のみ実行
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // エラーコードが400の場合は重複エラーであるとする
          if (error.response.status === 400) {
            setDuplicateError(true);
          }
        }
      }
    },
    [onClose, onCreateTag]
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
