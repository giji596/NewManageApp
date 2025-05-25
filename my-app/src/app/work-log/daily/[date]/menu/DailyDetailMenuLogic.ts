import { localClient } from "@/lib/localClient";
import { TaskLogSummary } from "@/type/Task";
import { keyframes } from "@emotion/react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";

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
export default function DailyDetailMenuLogic({}: Props) {
  const { date: dateParam } = useParams<{ date: string }>();
  const { data } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  const date = useMemo(() => {
    const date = data?.date ?? dateParam;
    return new Date(date);
  }, [data?.date, dateParam]);
  const taskList = useMemo(() => data?.taskList ?? [], [data]);
  const dailyHours = useMemo(
    () => taskList.reduce<number>((a, b) => a + b.dailyHours, 0),
    [taskList]
  );
  const taskLogSummary =
    taskList.reduce<TaskLogSummary[]>((a, b) => {
      const taskData: TaskLogSummary = { id: b.id, taskName: b.task.name };
      a.push(taskData);
      return a;
    }, []) ?? [];
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
  const isNoTask = useMemo(
    () => taskLogSummary.length === 0,
    [taskLogSummary.length]
  );

  return {
    /** 日付のstring(YYYY/MM/DD) */
    dateString,
    /** 稼働時間のグラフのアニメーション */
    growAnimation,
    /** タスクがないかどうか */
    isNoTask,
  };
}
