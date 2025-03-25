import { TaskSummary } from "./Task";

/** カテゴリーの選択賜の型定義 */
export type CategoryOption = {
  /** 識別用のid */
  id: number;
  /** カテゴリー名 */
  name: string;
};

/** カテゴリーの一覧データ型 */
export type CategorySummary = {
  /** 識別用のid */
  id: number;
  /** カテゴリー名 */
  name: string;
  /** タスクの一覧データ */
  TaskData: TaskSummary;
};
