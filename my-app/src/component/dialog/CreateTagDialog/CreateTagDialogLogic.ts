import { localClient } from "@/lib/localClient";
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
        const res = await localClient.work_log.tags.post({
          body: { tagName: data.tagName },
        });
        await mutate("api/work-log/tags");
        await mutate("api/work-log/tags/with-usage");
        onCreateTag?.(res.id); // 渡された場合のみ実行
        onClose();
      } catch (error) {
        // 重複エラーであるかメッセージで判定
        if (error instanceof Error && error.message === "duplicate error") {
          // エラーメッセージ表示
          setDuplicateError(true);
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
