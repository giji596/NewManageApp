import apiClient from "@/lib/apiClient";
import { TagOption } from "@/type/Tag";
import { TaskOption } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** タスクid */
  taskId: number;
  /** メモタイトル */
  title: string;
  /** タグid */
  tagId: number;
  /** 本文 */
  text: string;
};

type Props = {
  /** タスクの一覧 */
  taskList: TaskOption[];
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
  const tagList: TagOption[] = data?.body ?? [];
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitData>({
    defaultValues: {
      taskId: taskList[0].id,
      title: "",
      tagId: tagList[0].id,
      text: "",
    },
  });

  const onSubmit = useCallback(
    async (data: SubmitData) => {
      try {
        console.log("でーた", data); // TODO:BE繋ぎ込み時修正
        onClose();
      } catch {
        console.log("えらー");
      }
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
