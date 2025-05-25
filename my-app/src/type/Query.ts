/** 日付の一覧取得時のクエリ */
export type DateListQuery = {
  /** 年 */
  year?: number;
  /** 月 */
  month?: number;
};

/** 日付の一覧ページ用の詳細データのクエリ */
export type DateSummaryDetailQuery = {
  /** 対象のデータの日付 */
  date: string;
};
