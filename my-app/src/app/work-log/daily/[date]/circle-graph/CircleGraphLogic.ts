import { DailyCategoryCircleGraph } from "@/type/Date";
import { useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { PieLabelRenderProps } from "recharts";

type Props = {
  /** データ */
  data: DailyCategoryCircleGraph[];
};

/**
 * 日付詳細 - 円グラフコンポーネントのロジック部分
 */
export default function CircleGraphLogic({ data }: Props) {
  // MUIのテーマ呼び出し
  const theme = useTheme();
  const isNoData = useMemo(() => data.length === 0, [data]);
  const getLabel = useCallback(
    ({ name, percent }: PieLabelRenderProps) =>
      `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`,
    []
  );

  return {
    /** MUIのテーマ */
    theme,
    /** データの有無 */
    isNoData,
    /** ラベルを取得する関数 引数はPieのLabelのprops */
    getLabel,
  };
}
