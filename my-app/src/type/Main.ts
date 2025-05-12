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

/**
 * 日ごとの稼働時間のデータ型
 */
export type DailyWorkTime = {
  /**'2025-05-11' */
  date: string;
  /**  例: 3.25(3時間15分)  */
  totalHours: number;
};
