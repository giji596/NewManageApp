import { CategoryOption } from "./Category";
import { MemoTaskDetail } from "./Memo";

/** タスクの選択欄の型定義 */
export type TaskOption = {
  /** 識別用のid */
  id: number;
  /** タスク名 */
  name: string;
};

/** タスクの一覧データ型 */
export type TaskSummary = {
  /** 識別用のid */
  id: number;
  /** タスク名 */
  taskName: string;
  /** おきにかどうか */
  isFavorite: boolean;
  /** カテゴリー名 */
  categoryName: string;
  /** 進捗率 */
  progress: number;
  /** 稼働合計時間 */
  totalHours: number;
  /** 稼働開始日 */
  startDate: Date;
  /** 最終稼働日 */
  lastDate: Date;
};

/** タスクの詳細データの型定義 */
export type TaskDetail = {
  /** 識別用のid */
  id: number;
  /** タスク名 */
  name: string;
  /** ピン付の有無 */
  isFavorite: boolean;
  /** カテゴリー(navigation用のidつき) */
  category: CategoryOption;
  /** 進捗率 */
  progress: number;
  /** タスクの稼働合計時間 */
  totalHours: number;
  /** タスクの開始日 */
  startDate: Date;
  /** タスクの最終更新日 */
  lastDate: Date;
  /** タスクのメモ */
  memo: MemoTaskDetail[];
};

export type TaskWithPercentage = { id: number; name: string; percent: string };

export type DailyDetailTaskTableType = {
  /** 識別用(タスクの) */
  id: number;
  /** タスク*/
  task: TaskOption;
  /** カテゴリ */
  category: CategoryOption;
  /** 稼働時間 */
  dailyHours: number;
};
