import apiClient from "@/lib/apiClient";
import { localClient } from "@/lib/localClient";
import { TagOption } from "@/type/Tag";
import useAspidaSWR from "@aspida/swr";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

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
 * メモ編集のダイアログのロジック
 */
export default function MemoEditDialogLogic({
  id,
  tagName,
  title,
  onClose,
}: Props) {
  const { id: taskId, date } = useParams<{ id: string; date: string }>();
  // 初期値を保持(更新時のチェック用)
  const init = useRef<{ title: string; text: string; tagId: number }>({
    title: title,
    text: "",
    tagId: 0,
  });
  const { data, isLoading: isLoadingText } = useAspidaSWR(
    apiClient.work_log.memos._id(id).body,
    "get",
    { key: `api/work-log/memos/${id}/body` }
  );
  const text = useMemo(() => data?.body.text ?? "", [data?.body.text]);

  const { data: tagData, isLoading: isLoadingTag } = useSWR(
    "api/work-log/tags",
    localClient.work_log.tags.get()
  );
  const tagList: TagOption[] = useMemo(
    () =>
      tagData !== undefined
        ? [{ id: 0, name: "未選択" }, ...tagData]
        : [{ id: 0, name: "未選択" }],
    [tagData]
  );

  const isLoading = useMemo(
    () => isLoadingText || isLoadingTag,
    [isLoadingTag, isLoadingText]
  );

  // タグ名から検索してidを取得する
  const tagId = useMemo(
    () => tagList.find((tagItem) => tagItem.name === tagName)?.id,
    [tagList, tagName]
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  // RHF
  const { control, handleSubmit, setValue, reset } = useForm<SubmitData>({
    defaultValues: { text: "", tagId: 0, title: title },
  });
  // ロード完了時にsetValueで初期値をセットする
  useEffect(() => {
    if (!isLoading) {
      setValue("text", text);
      setValue("tagId", tagId ?? 0);
      init.current = { ...init.current, text: text, tagId: tagId ?? 0 };
    }
  }, [isLoading, setValue, tagId, text]);

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      setIsSending(true);
      // 送信データを作成(initの値と異なる場合のみ含める)
      const sendData: Record<string, string | number> = {};
      if (init.current.title !== data.title) sendData.title = data.title;
      if (init.current.text !== data.text) sendData.text = data.text;
      if (init.current.tagId !== data.tagId) sendData.tagId = data.tagId;
      await apiClient.work_log.memos._id(id).patch({
        body: sendData,
      });
      // 送信後に初期値のrefを更新する
      init.current = data;
      // 再検証して表示データに即時適応
      mutate(`api/work-log/tasks/${taskId}`);
      mutate(`api/work-log/daily/${date}`);
      // TODO: どうするかは今後の使用感で考える(isSendingいらんかも？)
      setIsSending(false);
      setIsEdit(false);
    },
    [date, id, taskId]
  );
  const handleReset = useCallback(() => {
    reset(init.current);
    setIsEdit(false);
  }, [reset]);

  const handleDelete = useCallback(async () => {
    await apiClient.work_log.memos._id(id).delete();
    mutate(`api/work-log/tasks/${taskId}`);
    onClose();
  }, [id, onClose, taskId]);

  const handleEdit = useCallback(() => setIsEdit(true), []);
  const setNewTag = useCallback(
    (newId: number) => setValue("tagId", newId),
    [setValue]
  );
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
    /** リセット時のハンドラー */
    handleReset,
    /** 削除時のハンドラー */
    handleDelete,
    /** 新規作成したタグをRHFの値に入れる関数 */
    setNewTag,
  };
}
