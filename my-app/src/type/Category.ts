import { DisplayRange } from "@/app/work-log/category/category-panel/component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
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

/** カテゴリページのパネルのクエリの一覧 */
export type CategoryPanelQuery = {
  /** last-3-months | "all" | "custom" */
  displayRange: string;
  /** yyyy-MM-dd形式(更新日の開始範囲) */
  startDate?: string;
  /** yyyy-MM-dd形式(更新日の終了範囲) */
  endDate?: string;
  /** "true"のみ */
  hideCompleted?: string;
};

/** カテゴリページのパネルのクエリのオブジェクト型 */
export type CategoryPanelQueryParams = {
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

/** カテゴリの線グラフの表示期間 */
export type CategoryLineGraphRange = "day" | "week" | "month";

/** カテゴリの線グラフの表示内容 */
export type CategoryLineGraphDisplay = "totalHours" | "taskCount";

/** カテゴリの線グラフのデータ型 */
export type CategoryLineGraphData = {
  /** 日付 */
  date: string;
} & {
  /**
   * - key:カテゴリid
   * - value:時間/タスク数
   */
  [id: number]: number;
};

/** カテゴリの線グラフのデータ情報 */
export type CategoryLineGraphDataInfo = {
  /** データキー名 */
  key: number;
  /** ツールチップで表示するデータ名 */
  name: string;
  /** 線の色 */
  color: string;
};

/** カテゴリ比較グラフのデータ型 */
export type CategoryCompareGraphData = {
  /** カテゴリid */
  id: number;
  /** カテゴリ名 */
  name: string;
  /** カテゴリのグラフの色 */
  color: string;
  /** 値(稼働時間 or タスク数) */
  value: number;
};

/** カテゴリの比較グラフの生データ型 */
export type CategoryCompareGraphRawData = {
  /** カテゴリのid */
  id: number;
  /** カテゴリ名 */
  name: string;
  /** カラー */
  color: string;
  /** 日毎の値 */
  values: {
    /** 日付 */
    date: string;
    /** 値 */
    value: number;
  }[];
};

/** カテゴリの比較グラフデータ取得時のクエリ */
export type CategoryCompareGraphQuery = {
  /** 表示対象(稼働時間 or タスク数) */
  displayTarget?: CategoryLineGraphDisplay;
  /** yyyy-MM-dd形式(更新日の開始範囲) */
  startDate?: string;
  /** yyyy-MM-dd形式(更新日の終了範囲) */
  endDate?: string;
};
