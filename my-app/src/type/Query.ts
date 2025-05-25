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

/** タスク一覧取得時のクエリ */
export type TaskOptionQuery = {
  /** 対象のカテゴリのID */
  categoryId: number;
};

/** カテゴリの稼働を取得する際のクエリ */
export type CategoryActivityQuery = {
  range?: "last-month" | "all" | "select";
  start?: string;
  end?: string;
};
