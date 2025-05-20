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
/**
 * データベースの存在チェック
 */
export const isDBExists = async () => {
  if (!("databases" in indexedDB)) {
    // Safariなど一部ブラウザでは未サポート
    console.warn("indexedDB.databases() はこのブラウザでは使えません");
    return false;
  }

  const databases = await indexedDB.databases();
  return databases.some((db) => db.name === dbName);
};

/**
 * データベースの初期化処理
 */
export const initializeDB = async () => {
  // スキーマ適応
  const db = new Dexie(dbName) as Dexie & {
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

  // これで空のデータをIndexedDB内に保存
  await db.open();
};
