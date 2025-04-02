import { MemoSummary } from "./Memo";

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
  name: string;
  /** ピン付の有無 */
  isPinned: boolean;
  /** カテゴリー名 */
  category: string;
  /** 進捗率 */
  progress: number;
  /** 稼働合計時間 */
  totalHours: number;
};

/** タスクの詳細データの型定義 */
export type TaskDetails = {
  /** 識別用のid */
  id: number;
  /** タスク名 */
  name: string;
  /** ピン付の有無 */
  isPinned: boolean;
  /** カテゴリー名 */
  category: string;
  /** 進捗率 */
  progress: number;
  /** タスクの稼働合計時間 */
  totalHours: number;
  /** タスクの開始日 */
  startDate: Date;
  /** タスクの最終更新日 */
  lastDate: Date;
  /** タスクのメモ */
  memo: MemoSummary[];
};

export type TaskWithPercentage = { id: number; name: string; percent: string };
