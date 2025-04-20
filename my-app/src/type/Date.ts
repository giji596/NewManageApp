import { CategoryWithPercentage } from "./Category";
import { MemoDailyTask, MemoSummary, MemoTitleList } from "./Memo";
import { DailyDetailTaskTableType, TaskWithPercentage } from "./Task";

/** 日付の一覧データ型 */
export type DateSummary = {
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

/** 日付の詳細データ型 */
export type DateDetailPage = {
  /** 識別用のid */
  id: number;
  /** 日付 */
  date: Date;
  /** タスクの一覧 */
  taskList: DailyDetailTaskTableType[];
  /** メモのタイトルと本文の一部と関連するタスクのリスト */
  memoList: MemoDailyTask[];
};

/** 日付詳細ページの円グラフのデータ型 */
export type DailyCategoryCircleGraph = {
  /** 名称 */
  name: string;
  /** 値(% * 10) */
  value: number;
  /** タスク */
  task: TaskWithPercentage[];
};
