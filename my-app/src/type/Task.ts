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
  /** お気に入りかどうか */
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
  /** タスクの詳細ページのメモ */
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

/** カテゴリの(特定期間内の)タスクの稼働状況の型定義 */
export type CategoryTaskActivity = {
  /** タスク名 */
  taskName: string;
  /** (期間内の)稼働時間 */
  totalHours: number;
};

/** カテゴリのタスク一覧をテーブルで表示する時のデータの型定義 */
export type CategoryTaskList = {
  /** 識別id(詳細ページ移動に利用) */
  id: number;
  /** タスク名(表示用) */
  name: string;
  /** 進捗(%) */
  progress: number;
  /** お気に入りかどうか */
  isFavorite: boolean;
};

/** メインページのタスク一覧の型定義 */
export type MainPageTaskTable = {
  /** id(タスクページ移動に利用) */
  id: number;
  /** タスク名 */
  name: string;
  /** 進捗(XX%の表示形式のstring) */
  progress: string;
};

/** タスクのログidと名称の型定義 */
export type TaskLogSummary = {
  /** タスクログのid */
  id: number;
  /** タスク名 */
  taskName: string;
};
