import apiClient from "@/lib/apiClient";
import { TagOption } from "@/type/Tag";
import useAspidaSWR from "@aspida/swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** 本文 */
  text: string;
  /* タグid */
  tagId: number;
  /** タイトル */
  title: string;
};

type Props = {
  /** メモのid */
  id: number;
  /* タグ名 */
  tagName: string;
  /** メモのタイトル */
  title: string;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};

/**
 * タスク詳細 メモのダイアログのロジック
 */
export default function MemoListDialogLogic({
  id,
  tagName,
  title,
  onClose,
}: Props) {
  // TODO:idを使ってデータフェッチ
  const { data, isLoading } = useAspidaSWR(
    apiClient.work_log.memos._id(id).body,
    "get",
    { key: `api/work-log/memos/${id}/body` }
  );
  const text = useMemo(() => data?.body.text ?? "", [data?.body.text]);

  // TODO:タグ一覧をデータフェッチ
  const tagList: TagOption[] = [
    { id: 1, name: "タグ1" },
    { id: 2, name: "タグ2" },
    { id: 3, name: "タグ3" },
  ];

  // タグ名から検索してidを取得する
  const tagId = tagList.find((tagItem) => tagItem.name === tagName)?.id;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  // RHF
  const { control, handleSubmit, setValue } = useForm<SubmitData>({
    defaultValues: { text: "", tagId: tagId, title: title },
  });
  // ロード完了時にsetValueで初期値をセットする
  useEffect(() => {
    if (!isLoading) {
      setValue("text", text);
    }
  }, [isLoading, setValue, text]);

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
    /** タグ一覧 */
    tagList,
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
