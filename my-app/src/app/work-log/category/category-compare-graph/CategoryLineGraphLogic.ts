import { useMemo } from "react";

type Props = {
  /** 表示データ */
  data: ({ date: string } & { [id: number]: number })[];
  /** 表示期間 */
  range: "day" | "week" | "month";
  /** 表示する内容 */
  displayData: "totalHours" | "taskCount";
};

/**
 * カテゴリ比較グラフのロジック
 */
export const CategoryLineGraphLogic = ({ data, range, displayData }: Props) => {
  const xLabel = useMemo(() => {
    switch (range) {
      case "day":
        return "期間(日)";
      case "week":
        return "期間(週)";
      case "month":
        return "期間(月)";
    }
  }, [range]);
  const yLabel = useMemo(() => {
    switch (displayData) {
      case "totalHours":
        return "稼働時間";
      case "taskCount":
        return "タスク数";
    }
  }, [displayData]);

  const keyList = useMemo(() => {
    return Object.keys(data[0]).filter((key) => key !== "date");
  }, [data]);
  return {
    /** x軸ラベル */
    xLabel,
    /** y軸ラベル */
    yLabel,
    /** アイテムのキーリスト */
    keyList,
  };
};
