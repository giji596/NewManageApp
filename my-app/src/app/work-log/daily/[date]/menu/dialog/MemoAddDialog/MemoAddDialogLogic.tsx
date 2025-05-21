import apiClient from "@/lib/apiClient";
import { localClient } from "@/lib/localClient";
import { TagOption } from "@/type/Tag";
import { TaskLogSummary } from "@/type/Task";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

type SubmitData = {
  /** タスクログid */
  logId: number;
  /** メモタイトル */
  title: string;
  /** タグid */
  tagId: number;
  /** 本文 */
  text: string;
};

type Props = {
  /** タスクの一覧 */
  taskList: TaskLogSummary[];
  /** ダイアログを閉じる関数 */
  onClose: () => void;
};
/**
 * メモ追加ダイアログコンポーネントのロジック
 */
export default function MemoAddDialogLogic({ taskList, onClose }: Props) {
  const { date } = useParams<{ date: string }>();
  const { data } = useSWR("api/work-log/tags", localClient.work_log.tags.get());
  const rawTagList: TagOption[] = data ?? [];
  const tagList: TagOption[] = [{ id: 0, name: "未選択" }, ...rawTagList];
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      logId: taskList[0].id,
      title: "",
      tagId: tagList[0].id,
      text: "",
    },
  });

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      let newData;
      // tagId0(未選択)の場合はtagIdを渡さない(undefined)
      if (data.tagId === 0) {
        newData = { title: data.title, text: data.text, taskLogId: data.logId };
      } else {
        newData = {
          title: data.title,
          text: data.text,
          taskLogId: data.logId,
          tagId: data.tagId,
        };
      }
      await apiClient.work_log.memos.post({ body: newData });
      mutate(`api/work-log/daily/${date}`);
      onClose();
    },
    [date, onClose]
  );

  const setNewTag = useCallback(
    (newId: number) => setValue("tagId", newId),
    [setValue]
  );
  return {
    /** タスクの一覧 */
    taskList,
    /** タグの一覧 */
    tagList,
    /** データ送信する関数 */
    onSubmit: handleSubmit(onSubmit),
    /** RHFのコントロールオブジェクト(MUIのコンポーネント制御のため必須) */
    control,
    /** バリデーション状況(onBlurで制御) */
    isValid,
    /** 新規作成したタグをRHFの値に入れる関数 */
    setNewTag,
  };
}
