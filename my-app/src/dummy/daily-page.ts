import { DateSummary } from "@/type/Date";
import { MemoTitleList } from "@/type/Memo";
import { DailyDetailTaskTableType } from "@/type/Task";

/**
 * 日付ページ一覧ページ用のダミーデータ
 */
export const DUMMY_DAILY_SUMMARY_DATA: DateSummary[] = [
  {
    id: 0,
    categoryName: "カテゴリ1",
    date: new Date("2025-01-24"),
    taskName: "タスク1",
    memo: [
      {
        id: 0,
        title: "メモ1",
        date: new Date("2025-01-24"),
        taskName: "タスク1",
      },
    ],
    dailyHours: 8,
  },
  {
    id: 1,
    categoryName: "カテゴリ2",
    date: new Date("2025-01-26"),
    taskName: "タスク2",
    memo: [
      {
        id: 0,
        title: "メモ1",
        date: new Date("2025-01-26"),
        taskName: "タスク2",
      },
    ],
    dailyHours: 8,
  },
  {
    id: 2,
    categoryName: "カテゴリ3",
    date: new Date("2025-01-29"),
    taskName: "タスク3",
    memo: [
      {
        id: 0,
        title: "メモ1",
        date: new Date("2025-01-29"),
        taskName: "タスク3",
      },
    ],
    dailyHours: 8,
  },
  {
    id: 4,
    categoryName: "カテゴリ1",
    date: new Date("2025-02-12"),
    taskName: "タスク1",
    memo: [
      {
        id: 0,
        title: "メモ1",
        date: new Date("2025-02-12"),
        taskName: "タスク1",
      },
      {
        id: 1,
        title: "メモ2",
        date: new Date("2025-02-12"),
        taskName: "タスク2",
      },
    ],
    dailyHours: 8,
  },
];

export const DUMMY_DAILY_CATEGORY_LIST = [
  {
    id: 0,
    name: "カテゴリ1",
    taskList: [
      {
        id: 0,
        name: "タスク1",
        percent: "50%",
      },
      {
        id: 1,
        name: "タスク1",
        percent: "30%",
      },
      {
        id: 2,
        name: "タスク1",
        percent: "20%",
      },
    ],
    percent: "70%",
  },
  {
    id: 1,
    name: "カテゴリ2",
    taskList: [
      {
        id: 0,
        name: "タスク4",
        percent: "50%",
      },
      {
        id: 1,
        name: "タスク5",
        percent: "50%",
      },
    ],
    percent: "30%",
  },
];

export const DUMMY_MEMO_LIST: MemoTitleList[] = [
  { id: 0, title: "メモ1" },
  { id: 1, title: "メモ2" },
  { id: 2, title: "メモ3" },
];

export const DUMMY_TASK_TABLE_LIST: DailyDetailTaskTableType[] = [
  { id: 0, name: "タスク1", categoryName: "カテゴリー1", dailyHours: 8 },
  { id: 1, name: "タスク2", categoryName: "カテゴリー1", dailyHours: 6 },
  { id: 2, name: "タスク3", categoryName: "カテゴリー2", dailyHours: 8 },
  { id: 3, name: "タスク4", categoryName: "カテゴリー2", dailyHours: 5 },
  { id: 4, name: "タスク5", categoryName: "カテゴリー3", dailyHours: 3 },
  { id: 5, name: "タスク6", categoryName: "カテゴリー3", dailyHours: 4 },
  {
    id: 6,
    name: "タスク19qwdqwfqfqfqqwdqwdwqwqsqwqdqdsadadadadasdasdadasdasdadasdassad04",
    categoryName: "カテゴリー11sdwqqwdwdwqdwqdqwdqwdqdqwqddqwqddaw21",
    dailyHours: 8,
  },
];
