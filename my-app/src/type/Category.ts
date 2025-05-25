import { DisplayRange } from "@/app/work-log/category/category-header/component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
import { TaskWithPercentage } from "./Task";
import { DateSelectInitValues } from "./common";

/** カテゴリーの選択賜の型定義 */
export type CategoryOption = {
  /** 識別用のid */
  id: number;
  /** カテゴリー名 */
  name: string;
};

export type CategoryWithPercentage = {
  id: number;
  name: string;
  taskList: TaskWithPercentage[];
  percent: string;
};

/** カテゴリページのヘッダーのクエリの一覧 */
export type CategoryHeaderQuery = {
  /** last-3-months | "all" | "custom" */
  displayRange: string;
  /** yyyy-MM-dd形式(更新日の開始範囲) */
  startDate?: string;
  /** yyyy-MM-dd形式(更新日の終了範囲) */
  endDate?: string;
  /** "true"のみ */
  hideCompleted?: string;
};

/** カテゴリページのヘッダーのクエリのオブジェクト型 */
export type CategoryHeaderQueryParams = {
  displayRange: DisplayRange;
  startDate: DateSelectInitValues;
  endDate: DateSelectInitValues;
  hideCompleted: boolean;
};

/** カテゴリページヘッダー部分のサマリーデータ */
export type CategorySummary = {
  name: string;
  isCompleted: boolean;
  totalHours: number;
  activeDate: string;
};

/** カテゴリページの稼働状況の範囲 */
export type CategoryActivityRange = "last-month" | "all" | "select";
