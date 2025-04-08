import { DailyCategoryCircleGraph, DateDetailPage } from "@/type/Date";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useMemo } from "react";

/**
 * 日付詳細ページのパラメータ関連
 */
export default function DailyDetailPageParams() {
  // TODO:でーたふぇっちする
  const params: DateDetailPage = {
    id: 1,
    date: new Date(),
    taskList: [
      {
        id: 1,
        task: { id: 1, name: "タスク1" },
        category: { id: 1, name: "カテゴリー1" },
        dailyHours: 3,
      },
      {
        id: 2,
        task: { id: 2, name: "タスク2" },
        category: { id: 1, name: "カテゴリー1" },
        dailyHours: 1,
      },
      {
        id: 3,
        task: { id: 3, name: "タスク3" },
        category: { id: 1, name: "カテゴリー1" },
        dailyHours: 0.8,
      },
      {
        id: 4,
        task: { id: 4, name: "タスク4" },
        category: { id: 2, name: "カテゴリー2" },
        dailyHours: 1.2,
      },
      {
        id: 5,
        task: { id: 5, name: "タスク5" },
        category: { id: 2, name: "カテゴリー2" },
        dailyHours: 0.6,
      },
      {
        id: 6,
        task: { id: 6, name: "タスク6" },
        category: { id: 3, name: "カテゴリー3" },
        dailyHours: 1,
      },
      {
        id: 7,
        task: { id: 7, name: "タスク7" },
        category: { id: 3, name: "カテゴリー3" },
        dailyHours: 0.4,
      },
    ],
    memoList: [
      {
        id: 1,
        title: "メモ1",
        summary: "本文のあたまああああああああああああああ",
        task: { id: 1, name: "タスク1" },
      },
      {
        id: 2,
        title: "メモ2",
        summary: "本文のあたまああああああああああああああ",
        task: { id: 2, name: "タスク2" },
      },
      {
        id: 3,
        title: "メモ3",
        summary: "本文のあたまああああああああああああああ",
        task: { id: 3, name: "タスク3" },
      },
      {
        id: 4,
        title: "メモ4",
        summary: "本文のあたまああああああああああああああ",
        task: { id: 3, name: "タスク3" },
      },
    ],
  };

  const isLoading = false;

  const date = params.date;
  const dailyHours = useMemo(
    () => params.taskList.reduce<number>((a, b) => a + b.dailyHours, 0),
    [params.taskList]
  );
  const taskList = params.taskList;
  const memoList = params.memoList;
  const circleDataList: DailyCategoryCircleGraph[] = useMemo(() => {
    const data = params.taskList;
    const totalHours = data.reduce((sum, item) => sum + item.dailyHours, 0);

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
  }, [params.taskList]);
  return {
    /** ロード状態 */
    isLoading,
    /** 日付 */
    date,
    /** 稼働時間 */
    dailyHours,
    /** タスク一覧 */
    taskList,
    /** メモ一覧 */
    memoList,
    /** 円グラフのデータ */
    circleDataList,
  };
}
