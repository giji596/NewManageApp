/**
 * メインページの円グラフの型
 */
export type MainPagePieChart = {
  /** 名称 */
  name: string;
  /** グラフ中の値 */
  value: number;
  /** タスクの一覧 */
  task: {
    /** タスク名 */
    name: string;
    /** 稼働時間(過去一ヶ月) */
    hours: string;
  }[];
};
