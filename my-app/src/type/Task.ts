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
  startDate: string;
  /** タスクの最終更新日 */
  lastDate: string;
  /** タスクの詳細ページのメモ */
  memo: MemoTaskDetail[];
  /** タスクの実施日の一覧(カレンダー表示用) */
  workDateList: CalendarDateMap;
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

/** タスク一覧ページ　データ範囲のクエリ型 */
export type TaskSummaryRangeQuery = {
  /** 進捗 [min,max] 例:0,90 */
  progress?: string;
  /** 開始日 [min,max] 例:2025-11-20,2025-12-30 */
  startDate?: string;
  /** 最終日 [min,max] 例:2025-11-20,2025-12-30  */
  lastDate?: string;
  /** 稼働あるのだけかどうか "true"のみ */
  activeOnly?: string;
};

/** カレンダー用のデータ構造 {key:年と月,value:日の配列  例:"2025-04":[1,2,4,6]} */
export type CalendarDateMap = Record<string, number[]>;
