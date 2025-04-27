import apiClient from "@/lib/apiClient";
import { ReplaceDateWithString } from "@/type/common";
import { DailyCategoryCircleGraph, DateDetailPage } from "@/type/Date";
import { DailyDetailTaskTableType, TaskLogSummary } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { useMemo } from "react";

type Props = {
  /** パスパラメータ(ページ呼び出し時に自動的に取得) */
  dateParam: string;
};
/**
 * 日付詳細ページのパラメータ関連
 */
export default function DailyDetailPageParams({ dateParam }: Props) {
  const { data, isLoading } = useAspidaSWR(
    apiClient.work_log.daily._date(dateParam),
    "get",
    { key: `api/work-log/daily/${dateParam}` }
  );
  const rawData: ReplaceDateWithString<DateDetailPage> = useMemo(
    () =>
      data?.body ?? {
        // dataない時は空データ渡す(一応isLoadingで表示しないようにしてるはずなのでいらないと思うけど)
        date: dateParam,
        taskList: [],
        memoList: [],
      },
    [data?.body, dateParam]
  );

  const date = new Date(rawData.date);
  const dailyHours = useMemo(
    () => rawData.taskList.reduce<number>((a, b) => a + b.dailyHours, 0),
    [rawData.taskList]
  );
  const taskList = rawData?.taskList;
  const taskLogSummary = taskList?.reduce<TaskLogSummary[]>((a, b) => {
    const taskData: TaskLogSummary = { id: b.id, taskName: b.task.name };
    a.push(taskData);
    return a;
  }, []);
  const memoList = rawData.memoList;
  const circleDataList: DailyCategoryCircleGraph[] = useMemo(() => {
    const data = rawData.taskList.filter((item) => item.dailyHours > 0);
    const totalHours = data.reduce((sum, item) => sum + item.dailyHours, 0);
    // 合計時間0の場合は空配列をreturn
    if (totalHours === 0) return [];
    // カテゴリごとにグループ化
    const groupedByCategory = data.reduce((acc, item) => {
      const key = item.category.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, DailyDetailTaskTableType[]>);

    return Object.entries(groupedByCategory).map(([name, items]) => {
      const categoryTotal = items.reduce(
        (sum, item) => sum + item.dailyHours,
        0
      );

      // タスクごとに集計（idとnameも残す）
      const taskMap = items.reduce((acc, item) => {
        const key = item.task.name; // nameでまとめる前提（idでまとめたければkey変えて）
        if (!acc[key]) {
          acc[key] = {
            id: item.task.id,
            name: item.task.name,
            hours: 0,
          };
        }
        acc[key].hours += item.dailyHours;
        return acc;
      }, {} as Record<string, { id: number; name: string; hours: number }>);

      // パーセント変換
      const task = Object.values(taskMap).map(({ id, name, hours }) => ({
        id,
        name,
        percent: ((hours / categoryTotal) * 100).toFixed(0) + "%",
      }));

      return {
        name,
        value: Math.round((categoryTotal / totalHours) * 1000),
        task,
      };
    });
  }, [rawData.taskList]);
  return {
    /** ロード状態 */
    isLoading,
    /** 日付 */
    date,
    /** 稼働時間 */
    dailyHours,
    /** タスク一覧 */
    taskList,
    /** タスク一覧(タイトルのみ) */
    taskLogSummary,
    /** メモ一覧 */
    memoList,
    /** 円グラフのデータ */
    circleDataList,
  };
}
