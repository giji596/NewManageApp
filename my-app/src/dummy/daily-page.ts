import { DateSummary } from "@/type/Date";

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
