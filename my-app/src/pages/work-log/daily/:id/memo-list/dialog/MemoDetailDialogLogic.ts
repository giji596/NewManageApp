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
  // TODO:idを使ってデータフェッチ
  const text =
    "本文の文章をなんかかいて、それがまとめて渡されるあああ、えええ、っっっでええあえふぁ";
  const isLoading = id ? false : true;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  // RHF
  const { control, handleSubmit, setValue } = useForm<SubmitData>({
    defaultValues: { text: "" },
  });
  // ロード完了時にsetValueで初期値をセットする
  useEffect(() => {
    if (!isLoading) {
      setValue("text", text);
    }
  }, [isLoading, setValue]);

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      //TODO:データ送信処理
      setIsSending(true);
      console.log("そうしんでーた", data);
      console.log("送信先id", id);
      if (true) {
        // TODO: データのレスポンスに応じて分岐
        setIsSending(false);
        setIsEdit(false);
      }
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
