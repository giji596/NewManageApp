import { DailyCategoryCircleGraph } from "@/type/Date";
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
  const dummyData = useMemo(() => [{ name: "NoData", value: 1 }], []);
  const isNoData = useMemo(() => data.length === 0, [data]);
  const displayData = useMemo(
    () => (isNoData ? dummyData : data),
    [data, dummyData, isNoData]
  );
  const color = useMemo(() => (isNoData ? "#ccc" : "#8884d8"), [isNoData]);
  const getLabel = useCallback(
    ({ name, percent }: PieLabelRenderProps) =>
      isNoData ? undefined : `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`,
    [isNoData]
  );

  return {
    /** データの有無 */
    isNoData,
    /** 表示データ(データがない場合にのみダミーデータを表示) */
    displayData,
    /** 背景色(データの有無で変化) */
    color,
    /** ラベルを取得する関数 引数はPieのLabelのprops */
    getLabel,
  };
}
