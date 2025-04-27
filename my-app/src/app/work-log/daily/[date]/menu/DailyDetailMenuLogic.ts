import { TaskLogSummary } from "@/type/Task";
import { keyframes } from "@emotion/react";
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

  const growAnimation = useMemo(() => {
    const dailyHourCoverGraphLength = (10 - dailyHours) * 10;
    return keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: ${dailyHourCoverGraphLength}%;
  }
`;
  }, [dailyHours]);
  const isNoTask = useMemo(() => taskList.length === 0, [taskList.length]);

  return {
    /** 日付のstring(YYYY/MM/DD) */
    dateString,
    /** 稼働時間のグラフのアニメーション */
    growAnimation,
    /** タスクがないかどうか */
    isNoTask,
  };
}
