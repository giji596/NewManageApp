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
