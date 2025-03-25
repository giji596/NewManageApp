import { MemoSummary } from "./Memo";
import { TaskLog } from "./Task";

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
export type DataDetail = {
  /** 識別用のid */
  id: number;
  /** 日付 */
  date: Date;
  /** その日のタスクの一覧 */
  dailyTask: TaskLog[];
};
