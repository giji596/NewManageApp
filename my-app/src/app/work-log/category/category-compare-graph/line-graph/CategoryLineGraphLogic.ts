import {
  CategoryLineGraphDisplay,
  CategoryLineGraphRange,
} from "@/type/Category";
import { useMemo } from "react";

type Props = {
  /** 表示期間 */
  range: CategoryLineGraphRange;
  /** 表示する内容 */
  displayData: CategoryLineGraphDisplay;
};

/**
 * カテゴリ比較グラフのロジック
 */
export const CategoryLineGraphLogic = ({ range, displayData }: Props) => {
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

  return {
    /** x軸ラベル */
    xLabel,
    /** y軸ラベル */
    yLabel,
  };
};
