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

/** データベースのデータをエクスポートする関数 */
export async function exportDatabase() {
  const allTables = db.tables;
  const exportData: Record<
    string,
    (DailyData | TaskLog | Task | Category | Memo | MemoTag)[]
  > = {};

  // テーブルごとにデータを取得
  for (const table of allTables) {
    const tableName = table.name;
    const data = await table.toArray(); // 全データ取得
    exportData[tableName] = data;
  }

  // JSON形式に変換
  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  // ダウンロード処理
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "logs-db-export.json";
  a.click();
  URL.revokeObjectURL(url); // メモリ解放
}
