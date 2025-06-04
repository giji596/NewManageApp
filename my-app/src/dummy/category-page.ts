import { CategoryCompareGraphRawData } from "@/type/Category";
import { CategoryTaskActivity, CategoryTaskList } from "@/type/Task";

/** タスク稼働のグラフデータのダミー */
export const DUMMY_TASK_ACTIVITY_DATA: CategoryTaskActivity[] = [
  { taskName: "タスク1", totalHours: 80 },
  { taskName: "タスク2", totalHours: 20 },
  { taskName: "タスク3", totalHours: 5 },
  { taskName: "タスク4", totalHours: 2.5 },
];

/** タスクリストのテーブルのダミー */
export const DUMMY_CATEGORY_TASK_LIST: CategoryTaskList[] = [
  { id: 1, name: "タスク1", progress: 80, isFavorite: false },
  { id: 2, name: "タスク2", progress: 100, isFavorite: false },
  { id: 3, name: "タスク3", progress: 60, isFavorite: true },
  { id: 4, name: "タスク4", progress: 50, isFavorite: false },
  { id: 5, name: "タスク5", progress: 100, isFavorite: true },
  { id: 6, name: "タスク6", progress: 70, isFavorite: true },
  { id: 7, name: "タスク7", progress: 40, isFavorite: false },
  { id: 8, name: "タスク8", progress: 60, isFavorite: true },
];

/** カテゴリ比較グラフのダミーデータ */
export const DUMMY_CATEGORY_COMPARE_GRAPH_DATA: CategoryCompareGraphRawData[] =
  [
    {
      id: 1,
      name: "カテゴリ1",
      values: [
        { date: "2022-01-01", value: 10 },
        { date: "2022-01-05", value: 20 },
        { date: "2022-01-10", value: 30 },
        { date: "2022-01-15", value: 40 },
        { date: "2022-01-20", value: 50 },
      ],
    },
    {
      id: 2,
      name: "カテゴリ2",
      values: [
        { date: "2022-01-01", value: 20 },
        { date: "2022-01-05", value: 40 },
        { date: "2022-01-10", value: 60 },
        { date: "2022-01-15", value: 80 },
        { date: "2022-01-20", value: 100 },
      ],
    },
    {
      id: 3,
      name: "カテゴリ3",
      values: [
        { date: "2022-01-01", value: 30 },
        { date: "2022-01-05", value: 60 },
        { date: "2022-01-10", value: 90 },
        { date: "2022-01-15", value: 120 },
        { date: "2022-01-20", value: 150 },
      ],
    },
    {
      id: 4,
      name: "カテゴリ4",
      values: [
        { date: "2022-01-01", value: 40 },
        { date: "2022-01-05", value: 80 },
        { date: "2022-01-10", value: 120 },
        { date: "2022-01-15", value: 160 },
        { date: "2022-01-20", value: 200 },
      ],
    },
    {
      id: 5,
      name: "カテゴリ5",
      values: [
        { date: "2022-01-01", value: 50 },
        { date: "2022-01-05", value: 100 },
        { date: "2022-01-10", value: 150 },
        { date: "2022-01-15", value: 200 },
        { date: "2022-01-20", value: 250 },
      ],
    },
    {
      id: 6,
      name: "カテゴリ6",
      values: [
        { date: "2022-01-01", value: 60 },
        { date: "2022-01-05", value: 120 },
        { date: "2022-01-10", value: 180 },
        { date: "2022-01-15", value: 240 },
        { date: "2022-01-20", value: 300 },
      ],
    },
    {
      id: 7,
      name: "カテゴリ7",
      values: [
        { date: "2022-01-01", value: 70 },
        { date: "2022-01-05", value: 140 },
        { date: "2022-01-10", value: 210 },
        { date: "2022-01-15", value: 280 },
        { date: "2022-01-20", value: 350 },
      ],
    },
    {
      id: 8,
      name: "カテゴリ8",
      values: [
        { date: "2022-01-01", value: 80 },
        { date: "2022-01-05", value: 160 },
        { date: "2022-01-10", value: 240 },
        { date: "2022-01-15", value: 320 },
        { date: "2022-01-20", value: 400 },
      ],
    },
    {
      id: 9,
      name: "カテゴリ9",
      values: [
        { date: "2022-01-01", value: 90 },
        { date: "2022-01-05", value: 180 },
        { date: "2022-01-10", value: 270 },
        { date: "2022-01-15", value: 360 },
        { date: "2022-01-20", value: 450 },
      ],
    },
    {
      id: 10,
      name: "カテゴリ10",
      values: [
        { date: "2022-01-01", value: 100 },
        { date: "2022-01-05", value: 200 },
        { date: "2022-01-10", value: 300 },
        { date: "2022-01-15", value: 400 },
        { date: "2022-01-20", value: 500 },
      ],
    },
    {
      id: 11,
      name: "カテゴリ11",
      values: [
        { date: "2022-01-01", value: 110 },
        { date: "2022-01-05", value: 220 },
        { date: "2022-01-10", value: 330 },
        { date: "2022-01-15", value: 440 },
        { date: "2022-01-20", value: 550 },
      ],
    },
  ];
