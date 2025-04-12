import { TaskSummary } from "@/type/Task";
import { format } from "date-fns";
import { useMemo } from "react";

type Props = {
  /** タスクの一覧データ */
  taskItem: TaskSummary;
};

/**
 * タスク一覧ページのテーブルボディコンポーネントのロジック部分
 */
export default function TaskSummaryTableBodyLogic({ taskItem }: Props) {
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

  return {
    /** 開始日のstring */
    startDateString,
    /** 終了日のstring */
    lastDateString,
    /** 進捗の選択賜 */
    progressSelects,
  };
}
