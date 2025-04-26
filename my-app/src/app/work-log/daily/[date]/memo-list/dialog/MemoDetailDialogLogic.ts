import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** 本文 */
  text: string;
};

type Props = {
  /** メモのid */
  id: number;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * メモの詳細を表示するダイアログのロジック
 */
export default function MemoDetailDialogLogic({ id, onClose }: Props) {
  const { data, isLoading } = useAspidaSWR(
    apiClient.work_log.memos._id(id).body,
    "get",
    { key: `api/work-log/memos/${id}/body` }
  );
  const text = data?.body.text;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  // RHF
  const { control, handleSubmit, setValue } = useForm<SubmitData>({
    defaultValues: { text: "" },
  });
  // ロード完了時にsetValueで初期値をセットする
  useEffect(() => {
    if (text) {
      setValue("text", text);
    }
  }, [setValue, text]);

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      setIsSending(true);
      await apiClient.work_log.memos
        ._id(id)
        .patch({ body: { text: data.text } });
      // TODO: データのレスポンスに応じて分岐
      // 必要かわかんないのでとりま放置
      setIsSending(false);
      setIsEdit(false);
    },
    [id]
  );

  const handleDelete = useCallback(async () => {
    // TODO: 削除のリクエスト
    console.log("削除対象のid", id);
    onClose();
  }, [id, onClose]);

  const handleEdit = useCallback(() => setIsEdit(true), []);
  return {
    /** 編集状態かどうか */
    isEdit,
    /** RHFのコントロールオブジェクト(MUIコンポーネント管理に使用) */
    control,
    /** ロード状態 */
    isLoading,
    /** 送信の状態 */
    isSending,
    /** 送信時のハンドラー */
    onSubmit: handleSubmit(onSubmit),
    /** 編集状態に入るときのハンドラー */
    handleEdit,
    /** 削除時のハンドラー */
    handleDelete,
  };
}
