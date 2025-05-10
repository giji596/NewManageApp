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
