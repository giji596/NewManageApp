import apiClient from "@/lib/apiClient";
import { TagOption } from "@/type/Tag";
import { TaskLogSummary } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

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
  const { data } = useAspidaSWR(apiClient.work_log.memos.tags, "get", {
    key: "api/work-log/memos/tags",
  });
  const rawTagList: TagOption[] = data?.body ?? [];
  const tagList: TagOption[] = [{ id: 0, name: "未選択" }, ...rawTagList];
  const {
    control,
    handleSubmit,
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
      onClose();
    },
    [onClose]
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
  };
}
