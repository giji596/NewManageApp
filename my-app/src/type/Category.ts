import { DisplayRange } from "@/app/work-log/category/category-header/component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
import { TaskSummary, TaskWithPercentage } from "./Task";
import { DateSelectInitValues } from "./common";

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

export type CategoryWithPercentage = {
  id: number;
  name: string;
  taskList: TaskWithPercentage[];
  percent: string;
};

/** カテゴリページのヘッダーのクエリのオブジェクト型 */
export type CategoryHeaderQueryParams = {
  displayRange: DisplayRange;
  startDate: DateSelectInitValues;
  endDate: DateSelectInitValues;
  hideCompleted: boolean;
};
