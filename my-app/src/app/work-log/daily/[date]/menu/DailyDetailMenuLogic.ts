import { TaskLogSummary } from "@/type/Task";
import { format } from "date-fns";
import { useMemo } from "react";

type Props = {
  /** 対象の日付データ */
  date: Date;
  /** 稼働時間 */
  dailyHours: number;
  /** タスクの一覧 */
  taskList: TaskLogSummary[];
};

/**
 * 日付詳細　ナビゲーションやらのメニューのコンポーネントのロジック
 */
export default function DailyDetailMenuLogic({
  date,
  dailyHours,
  taskList,
}: Props) {
  // Date => YYYY/MM/DDに変換する
  const dateString = useMemo(() => format(date, "yyyy/MM/dd"), [date]);
  const dailyHourCoverGraphLength = useMemo(
    () => (10 - dailyHours) * 10,
    [dailyHours]
  );
  const isNoTask = useMemo(() => taskList.length === 0, [taskList.length]);

  return {
    /** 日付のstring(YYYY/MM/DD) */
    dateString,
    /** 稼働時間の灰色の空白部分のグラフの長さ(%) 稼働時間の反対なので、0%=10h 100%=0h */
    dailyHourCoverGraphLength,
    /** タスクがないかどうか */
    isNoTask,
  };
}
