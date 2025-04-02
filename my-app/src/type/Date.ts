import { CategoryWithPercentage } from "./Category";
import { MemoSummary, MemoTitleList } from "./Memo";

/** 日付の一覧データ型 */
export type DateSummary = {
  /** 判別用のID */
  id: number;
  /** 日付 */
  date: Date;
  /** メインカテゴリ名 */
  categoryName: string;
  /** メインタスク名 */
  taskName: string;
  /** メモ */
  memo: MemoSummary[];
  /** 1日の稼働時間 */
  dailyHours: number;
};

/** 日付の詳細データ型 */
export type DateDetail = {
  /** 識別用のid */
  id: number;
  /** 日付 */
  date: Date;
  /** 割合つきのカテゴリリスト */
  categoryList: CategoryWithPercentage[];
  /** メモのタイトルとidだけのリスト */
  memoList: MemoTitleList[];
};
