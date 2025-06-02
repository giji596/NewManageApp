import { localClient } from "@/lib/localClient";
import { TaskLogSummary } from "@/type/Task";
import { keyframes } from "@emotion/react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";

/**
 * 日付詳細　ナビゲーションやらのメニューのコンポーネントのロジック
 */
export default function DailyDetailMenuLogic() {
  const { date: dateParam } = useParams<{ date: string }>();
  // ナビゲーション関連
  const router = useRouter();
  const { data } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  // Date => YYYY/MM/DDに変換する
  const dateString = useMemo(() => {
    // yyyy-mm-ddで取得
    const date = data?.date ?? dateParam;
    return date.replaceAll("-", "/");
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

  // ナビゲーション関連
  // 選択範囲関連
  const today = useMemo(() => {
    return new Date().toISOString().slice(0, 10);
  }, []);
  const tenYearsAgo = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    return date.toISOString().slice(0, 10);
  }, []);
  // 今日より後は選択不可
  const isLastRange = useMemo(() => {
    return dateParam === today;
  }, [dateParam, today]);
  // 10年前より前は選択不可
  const isStartRange = useMemo(() => {
    return dateParam === tenYearsAgo;
  }, [dateParam, tenYearsAgo]);

  const navigatePrevDay = () => {
    const date = new Date(dateParam);
    date.setDate(date.getDate() - 1);
    const prevDate = date.toISOString().slice(0, 10);
    router.replace(`${prevDate}`);
  };
  const navigateNextDay = () => {
    const date = new Date(dateParam);
    date.setDate(date.getDate() + 1);
    const nextDate = date.toISOString().slice(0, 10);
    router.replace(`${nextDate}`);
  };

  return {
    /** 稼働時間 */
    dailyHours,
    /** タスクの一覧 */
    taskLogSummary,
    /** 日付のstring(YYYY/MM/DD) */
    dateString,
    /** 稼働時間のグラフのアニメーション */
    growAnimation,
    /** タスクがないかどうか */
    isNoTask,
    /** 前の日に移動 */
    navigatePrevDay,
    /** 次の日に移動 */
    navigateNextDay,
    /** 最後の日付の範囲かどうか */
    isLastRange,
    /** 開始の日付の範囲かどうか */
    isStartRange,
  };
}
