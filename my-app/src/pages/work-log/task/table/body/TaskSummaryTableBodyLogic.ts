import { TaskSummary } from "@/type/Task";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

type SubmitData = {
  /** お気に入りのチェック */
  isFavorite: boolean;
  /** 進捗率 */
  progress: number;
};

type Props = {
  /** タスクの一覧データ */
  taskItem: TaskSummary;
};

/**
 * タスク一覧ページのテーブルボディコンポーネントのロジック部分
 */
export default function TaskSummaryTableBodyLogic({ taskItem }: Props) {
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
    formState: { isDirty },
  } = useForm<SubmitData>({
    defaultValues: {
      isFavorite: taskItem.isFavorite,
      progress: taskItem.progress,
    },
  });

  const getData = useCallback(
    () => (isDirty ? getValues() : null),
    [getValues, isDirty]
  );

  return {
    /** 開始日のstring */
    startDateString,
    /** 終了日のstring */
    lastDateString,
    /** 進捗の選択賜 */
    progressSelects,
    /** RHFのコントロールオブジェクト(MUIコンポーネントに必須) */
    control,
    /** フォームの変更の有無 */
    isDirty,
    /** フォームのデータを取得する関数(isDirty=falseの場合はnullを返す) */
    getData,
  };
}
