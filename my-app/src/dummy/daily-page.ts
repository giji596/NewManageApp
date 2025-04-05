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
  {
    id: 0,
    task: { id: 1, name: "タスク1" },
    category: { id: 1, name: "カテゴリー1" },
    dailyHours: 8,
  },
  {
    id: 1,
    task: { id: 2, name: "タスク2" },
    category: { id: 1, name: "カテゴリー1" },
    dailyHours: 6,
  },
  {
    id: 2,
    task: { id: 3, name: "タスク3" },
    category: { id: 2, name: "カテゴリー2" },
    dailyHours: 8,
  },
  {
    id: 3,
    task: { id: 4, name: "タスク4" },
    category: { id: 2, name: "カテゴリー2" },
    dailyHours: 5,
  },
  {
    id: 4,
    task: { id: 5, name: "タスク5" },
    category: { id: 3, name: "カテゴリー3" },
    dailyHours: 3,
  },
  {
    id: 5,
    task: { id: 6, name: "タスク6" },
    category: { id: 3, name: "カテゴリー3" },
    dailyHours: 4,
  },
  {
    id: 6,
    task: {
      id: 2231312,
      name: "タスク19qwdqwfqfqfqqwdqwdwqwqsqwqdqdsadadadadasdasdadasdasdadasdassad04",
    },
    category: {
      id: 31251124124,
      name: "カテゴリー11sdwqqwdwdwqdwqdqwdqwdqdqwqddqwqddaw21",
    },
    dailyHours: 8,
  },
];
