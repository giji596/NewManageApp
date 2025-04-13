import { MemoTaskDetail } from "@/type/Memo";
import { TaskSummary } from "@/type/Task";

/** 一覧ページのダミーデータ */
export const DUMMY_TASK_SUMMARY_DATA: TaskSummary[] = [
  {
    id: 1,
    isFavorite: false,
    taskName: "タスク1",
    categoryName: "カテゴリ1",
    progress: 50,
    totalHours: 20,
    startDate: new Date("2025-03-24"),
    lastDate: new Date("2025-04-10"),
  },
  {
    id: 2,
    isFavorite: false,
    taskName: "タスク2",
    categoryName: "カテゴリ1",
    progress: 40,
    totalHours: 25,
    startDate: new Date("2025-03-25"),
    lastDate: new Date("2025-04-12"),
  },
  {
    id: 3,
    isFavorite: false,
    taskName: "タスク3",
    categoryName: "カテゴリ2",
    progress: 50,
    totalHours: 20,
    startDate: new Date("2025-02-22"),
    lastDate: new Date("2025-03-14"),
  },
  {
    id: 4,
    isFavorite: false,
    taskName: "タスク4",
    categoryName: "カテゴリ2",
    progress: 100,
    totalHours: 20,
    startDate: new Date("2025-01-14"),
    lastDate: new Date("2025-02-05"),
  },
  {
    id: 5,
    isFavorite: true,
    taskName: "タスク5",
    categoryName: "カテゴリ3",
    progress: 100,
    totalHours: 12,
    startDate: new Date("2025-04-10"),
    lastDate: new Date("2025-04-11"),
  },
];

export const DUMMY_TASK_DETAIL_MEMO: MemoTaskDetail[] = [
  {
    id: 1,
    date: new Date("2025-03-22"),
    title: "タイトル1",
    tag: "タグ1",
    summary: "本文の一部抜粋",
  },
  {
    id: 2,
    date: new Date("2025-04-12"),
    title: "タイトル2",
    tag: "タグ1",
    summary: "本文の一部抜粋",
  },
  {
    id: 3,
    date: new Date("2025-03-10"),
    title: "タイトル3",
    tag: "タグ2",
    summary: "本文の一部抜粋",
  },
  {
    id: 4,
    date: new Date("2024-01-24"),
    title: "タイトル4",
    tag: "タグ2",
    summary: "本文の一部抜粋",
  },
  {
    id: 5,
    date: new Date("2025-02-22"),
    title: "タイトル5",
    tag: "タグ3",
    summary: "本文の一部抜粋",
  },
  {
    id: 6,
    date: new Date("2025-03-22"),
    title: "タイトル6",
    tag: "タグ3",
    summary: "本文の一部抜粋",
  },
];
