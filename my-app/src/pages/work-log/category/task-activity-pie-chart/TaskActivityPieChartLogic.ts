import { DUMMY_TASK_ACTIVITY_DATA } from "@/dummy/category-page";
import { useMemo } from "react";

type Props = {
  /** かてごりid */
  categoryId: number;
};

/**
 * 設定した期間のタスク稼働率を円グラフで表示するコンポーネントのロジック
 */
export default function TaskActivityPieChartLogic({ categoryId }: Props) {
  // TODO:データフェッチする(実際はSWR使う予定なのでmemo化は不要)
  const data = useMemo(() => {
    console.log("でーたふぇっち対象:", categoryId);
    return DUMMY_TASK_ACTIVITY_DATA;
  }, [categoryId]);

  return {
    /** タスクの稼働データ */
    data,
  };
}
