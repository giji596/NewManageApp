import { localClient } from "@/lib/localClient";
import { DailyCategoryCircleGraph } from "@/type/Date";
import { DailyDetailTaskTableType } from "@/type/Task";
import { useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { PieLabelRenderProps } from "recharts";
import useSWR from "swr";

/**
 * 日付詳細 - 円グラフコンポーネントのロジック部分
 */
export default function CircleGraphLogic() {
  // データ取得
  const { date: dateParam } = useParams<{ date: string }>();
  const { data: rawData } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  const circleDataList: DailyCategoryCircleGraph[] = useMemo(() => {
    const data = rawData?.taskList.filter((item) => item.dailyHours > 0) ?? [];
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
  }, [rawData]);

  // MUIのテーマ呼び出し
  const theme = useTheme();
  const isNoData = useMemo(() => circleDataList.length === 0, [circleDataList]);
  const getLabel = useCallback(
    ({ name, percent }: PieLabelRenderProps) =>
      `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`,
    []
  );

  return {
    /** 円グラフのデータ */
    circleDataList,
    /** MUIのテーマ */
    theme,
    /** データの有無 */
    isNoData,
    /** ラベルを取得する関数 引数はPieのLabelのprops */
    getLabel,
  };
}
