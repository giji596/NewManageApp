import { ERROR_PAGE_ID } from "@/constant/errorPages";
import { localClient } from "@/lib/localClient";
import { ReplaceDateWithString } from "@/type/common";
import { DailyCategoryCircleGraph, DateDetailPage } from "@/type/Date";
import { DailyDetailTaskTableType, TaskLogSummary } from "@/type/Task";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

/**
 * 日付詳細ページのパラメータ関連
 */
export default function DailyDetailPageParams() {
  const { date: dateParam } = useParams<{ date: string }>();
  const { data, isLoading } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  const rawData: ReplaceDateWithString<DateDetailPage> = useMemo(
    () =>
      data ?? {
        // dataない時は空データ渡す(一応isLoadingで表示しないようにしてるはずなのでいらないと思うけど)
        date: dateParam,
        taskList: [],
        memoList: [],
      },
    [data, dateParam]
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

  // 状態管理
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const selectedItemTaskId = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.task.id;
    return ERROR_PAGE_ID;
  }, [selectedItemId, taskList]);
  // タスクの一覧に変更があった場合(SWRで再フェッチが行われるタイミング)、選択を解除する
  useEffect(() => {
    setSelectedItemId(null);
    // 長さが変わった場合のみ(create/delete)選択を解除させる
  }, [taskList.length]);
  // ローカル--------------------------------------------------
  const doSelectItem = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  const doDeselectItem = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  // -----------------------------------------------------------

  const handleSelectItem = useCallback(
    (id: number) => {
      // アイテムが選択中のアイテムと一致する場合
      // 選択の解除を行う
      if (selectedItemId === id) {
        doDeselectItem();
      } else {
        // 選択中のアイテムでない場合
        // 選択中のアイテムを変更する
        doSelectItem(id);
      }
    },
    [doDeselectItem, doSelectItem, selectedItemId]
  );

  return {
    /** ロード状態 */
    isLoading,
    /** 日付 */
    date,
    /** 稼働時間 */
    dailyHours,
    /** タスク一覧(タイトルのみ) */
    taskLogSummary,
    /** メモ一覧 */
    memoList,
    /** 円グラフのデータ */
    circleDataList,
    /** 選択中のアイテムID */
    selectedItemId,
    /** 選択中のタスクID(メモのハイライト用) */
    selectedItemTaskId,
    /** アイテムを選択するハンドラー */
    handleSelectItem,
  };
}
