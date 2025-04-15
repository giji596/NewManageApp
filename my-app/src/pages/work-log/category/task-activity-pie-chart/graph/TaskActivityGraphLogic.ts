import { CategoryTaskActivity } from "@/type/Task";
import { useMemo } from "react";

type Props = {
  /** データ */
  data: CategoryTaskActivity[];
};

/**
 * 特定の期間のタスク稼働を表現するグラフのロジック
 */
export default function TaskActivityGraphLogic({ data }: Props) {
  const pieData = useMemo(() => {
    // 全体の稼働に対する割合が欲しいので稼働時間を合計する
    const totalHours = data.reduce<number>((a, b) => a + b.totalHours, 0);
    // Pieで使用するデータ{name:string,value:number(1000=100%となる)}に変換する
    const formattedData = data.reduce<{ name: string; value: number }[]>(
      (a, b) => {
        const name = b.taskName; // nameはタスク名
        const value = (b.totalHours / totalHours) * 1000; // valueは全タスクの稼働時間中のタスクの稼働時間の割合 10% => value:100に換算
        a.push({ name, value });
        return a;
      },
      []
    );
    return formattedData;
  }, [data]);

  return {
    /** データを円グラフように変換したもの */
    pieData,
  };
}
