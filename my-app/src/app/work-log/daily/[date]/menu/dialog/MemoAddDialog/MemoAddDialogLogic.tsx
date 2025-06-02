import { localClient } from "@/lib/localClient";
import { TagOption } from "@/type/Tag";
import { TaskLogSummary } from "@/type/Task";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
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
    getValues,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      logId: taskList[0].id,
      title: "",
      tagId: tagList[0].id,
      text: "",
    },
  });

  const handleCloseIfInvalidAllowed = useCallback(
    () => (isValid ? undefined : onClose()),
    [isValid, onClose]
  );

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
      await localClient.work_log.memos.post({ body: newData });
      mutate(`api/work-log/daily/${date}`);
      onClose();
    },
    [date, onClose]
  );

  const setNewTag = useCallback(
    (newId: number) => setValue("tagId", newId),
    [setValue]
  );
  const clearTag = useCallback(
    (targetId: number) => {
      // 現在の値を取得
      const currentValue = getValues("tagId");
      // 対象が現在の値と一致する場合は初期化(0:未設定)
      if (currentValue === targetId) setValue("tagId", 0);
    },
    [getValues, setValue]
  );
  const tagEditorActions = useMemo(() => {
    return { set: setNewTag, clear: clearTag };
  }, [setNewTag, clearTag]);
  return {
    /** タスクの一覧 */
    taskList,
    /** タグの一覧 */
    tagList,
    /** バリデーションが無効な場合のみダイアログを閉じる関数(内容を入力中に誤って外部をクリックして閉じる防止用) */
    handleCloseIfInvalidAllowed,
    /** データ送信する関数 */
    onSubmit: handleSubmit(onSubmit),
    /** RHFのコントロールオブジェクト(MUIのコンポーネント制御のため必須) */
    control,
    /** バリデーション状況(onBlurで制御) */
    isValid,
    /** タグ編集時のアクション*/
    tagEditorActions,
  };
}
