import { DailyCategoryCircleGraph, DateDetailPage } from "@/type/Date";
import { useMemo } from "react";

// percent("XX%" string)=>value(XX0 number)への変換
const percentToValue = (percent: string) => Number(percent.slice(0, -1) + "0");

/**
 * 日付詳細ページのパラメータ関連
 */
export default function DailyDetailPageParams() {
  // TODO:でーたふぇっちする
  const params: DateDetailPage = {
    id: 1,
    date: new Date(),
    dailyHours: 8,
    categoryList: [
      {
        id: 1,
        name: "カテゴリ1",
        taskList: [
          { id: 1, name: "タスク1", percent: "50%" },
          { id: 2, name: "タスク2", percent: "30%" },
          { id: 3, name: "タスク3", percent: "20%" },
        ],
        percent: "60%",
      },
      {
        id: 2,
        name: "カテゴリ2",
        taskList: [
          { id: 4, name: "タスク4", percent: "80%" },
          { id: 5, name: "タスク5", percent: "20%" },
        ],
        percent: "25%",
      },
      {
        id: 3,
        name: "カテゴリ3",
        taskList: [
          { id: 6, name: "タスク6", percent: "50%" },
          { id: 7, name: "タスク7", percent: "50%" },
        ],
        percent: "15%",
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
  const dailyHours = params.dailyHours;
  const memoList = params.memoList;
  const circleDataList: DailyCategoryCircleGraph[] = useMemo(
    () =>
      params.categoryList.reduce<DailyCategoryCircleGraph[]>((a, b) => {
        const circleData: DailyCategoryCircleGraph = {
          name: b.name,
          value: percentToValue(b.percent),
          task: b.taskList,
        };
        a.push(circleData);
        return a;
      }, []),
    [params.categoryList]
  );

  return {
    /** ロード状態 */
    isLoading,
    /** 日付 */
    date,
    /** 稼働時間 */
    dailyHours,
    /** メモ一覧 */
    memoList,
    /** 円グラフのデータ */
    circleDataList,
  };
}
