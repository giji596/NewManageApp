import {
  Category,
  DailyData,
  Memo,
  MemoTag,
  Task,
  TaskLog,
} from "@/type/Schema";
import Dexie, { EntityTable } from "dexie";

const dbName = "MyDatabase";

// スキーマ適応
export const db = new Dexie(dbName) as Dexie & {
  dailyData: EntityTable<DailyData, "date">;
  taskLogs: EntityTable<TaskLog, "id">;
  tasks: EntityTable<Task, "id">;
  categories: EntityTable<Category, "id">;
  memos: EntityTable<Memo, "id">;
  memoTags: EntityTable<MemoTag, "id">;
};

// テーブルを定義
db.version(1).stores({
  dailyData: "date",
  taskLogs: "++id, taskId, date",
  tasks: "++id, categoryId",
  categories: "++id, name",
  memos: "++id, taskLogId, tagId",
  memoTags: "++id, name",
});
