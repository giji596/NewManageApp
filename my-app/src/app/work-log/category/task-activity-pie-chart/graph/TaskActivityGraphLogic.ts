import { CategoryTaskActivity } from "@/type/Task";
import { useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";
import {
  Formatter,
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  /** データ */
  data: CategoryTaskActivity[];
};

/**
 * 特定の期間のタスク稼働を表現するグラフのロジック
 */
export default function TaskActivityGraphLogic({ data }: Props) {
  // MUIテーマ呼び出し
  const theme = useTheme();
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
    // 識別用にindexを追加(フォーマット時に利用)
    const formattedDataWithIndex = formattedData.map((v, i) => {
      return { ...v, index: i };
    });
    return formattedDataWithIndex;
  }, [data]);

  const toolChipFormatter: Formatter<ValueType, NameType> = useCallback(
    (_, name, props) => {
      const index = props.payload.index;
      return [`${data[index].totalHours}時間`, name];
    },
    [data]
  );

  return {
    /** MUIのテーマ */
    theme,
    /** データを円グラフように変換したもの */
    pieData,
    /** ToolChipの表示のフォーマット用関数(稼働時間を表示させる) */
    toolChipFormatter,
  };
}
