import { TaskSummary } from "@/type/Task";
import { format } from "date-fns";
import { Ref, useEffect, useImperativeHandle, useMemo } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** お気に入りのチェック */
  isFavorite: boolean;
  /** 進捗率 */
  progress: number;
};

export type TaskSummaryTableBodyHandle = {
  getFormData: () => SubmitData;
  resetFormData: () => void;
};
type Props = {
  /** タスクの一覧データ */
  taskItem: TaskSummary;
  /** ref値(親で関数を使えるように) */
  ref: Ref<TaskSummaryTableBodyHandle>;
  /** isDirtyの変化の通知を受け取る関数 */
  onDirtyChange: (targetId: number, isDirty: boolean) => void;
};

/**
 * タスク一覧ページのテーブルボディコンポーネントのロジック部分
 */
export default function TaskSummaryTableBodyLogic({
  taskItem,
  ref,
  onDirtyChange,
}: Props) {
  // メモ化
  const startDateString = useMemo(
    () => format(taskItem.startDate, "yyyy/MM/dd"),
    [taskItem.startDate]
  );
  const lastDateString = useMemo(
    () => format(taskItem.lastDate, "yyyy/MM/dd"),
    [taskItem.lastDate]
  );
  const progressSelects = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => i * 10);
  }, []);

  // RHF
  const {
    control,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm<SubmitData>({
    defaultValues: {
      isFavorite: taskItem.isFavorite,
      progress: taskItem.progress,
    },
  });

  // 親に渡すメソッド
  useImperativeHandle(ref, () => ({
    getFormData: () => getValues(), // RHFのデータ取得
    resetFormData: () => reset(), // RHFのデータを戻すメソッド
  }));

  const backGroundColor = useMemo(
    () => (isDirty ? "rgb(255, 238, 238)" : "rgb(255, 255, 255)"),
    [isDirty]
  );

  // isDirtyが変わった際の通知(taskItem.idは固定/onDirtyChangeはcallbackであるため、isDirtyの値が変わった時だけ走る、予定)
  // (onDirtyChangeでset関数を使う場合はprevを必ず使うこと(レンダー時に再生成すると不都合なので))
  useEffect(() => {
    onDirtyChange(taskItem.id, isDirty);
  }, [isDirty, onDirtyChange, taskItem.id]);

  return {
    /** 開始日のstring */
    startDateString,
    /** 終了日のstring */
    lastDateString,
    /** 進捗の選択賜 */
    progressSelects,
    /** 背景色(isDirtyの値で分岐) */
    backGroundColor,
    /** RHFのコントロールオブジェクト(MUIコンポーネントに必須) */
    control,
    /** フォームの変更の有無 */
    isDirty,
  };
}
