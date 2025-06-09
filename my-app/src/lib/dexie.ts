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
db.version(2).stores({
  dailyData: "date",
  taskLogs: "++id, taskId, date,[date+taskId]",
  tasks: "++id, categoryId",
  categories: "++id, name",
  memos: "++id, taskLogId, tagId",
  memoTags: "++id, name",
});

/** テーブル一覧を取得する */
const getAllTables = () => [
  db.dailyData,
  db.taskLogs,
  db.tasks,
  db.categories,
  db.memos,
  db.memoTags,
];

/** エクスポート時のデータの型定義 */
type ExportData = DailyData | TaskLog | Task | Category | Memo | MemoTag;
/** インポート時のデータの型定義 */
export type ImportData = {
  dailyData: DailyData[];
  taskLogs: TaskLog[];
  tasks: Task[];
  categories: Category[];
  memos: Memo[];
  memoTags: MemoTag[];
};
/** データベースを初期化する関数 */
export async function clearDatabase() {}

/** データベースのデータをエクスポートする関数 */
export async function exportDatabase() {
  const allTables = db.tables;
  const exportData: Record<string, ExportData[]> = {};

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

/** いずれかのテーブルにデータが存在するかをチェックする関数 */
export async function isDatabaseExist() {
  const tables = getAllTables();
  // いずれかのテーブルにデータがあればtrue
  for (const table of tables) {
    const data = await table.toArray();
    if (data.length > 0) return true;
  }
  // いずれかのテーブルにデータがなければfalse
  return false;
}

/** データベースのデータをインポートする関数 */
export async function importDatabase(json: ImportData) {
  const tables = getAllTables();
  // トランザクションで全てのテーブルをクリアしてからデータを追加(失敗時はロールバック)
  await db.transaction("rw", tables, async () => {
    // クリア処理
    await Promise.all(tables.map((table) => table.clear()));

    // データ追加処理
    await db.dailyData.bulkAdd(json.dailyData);
    await db.taskLogs.bulkAdd(json.taskLogs);
    await db.tasks.bulkAdd(json.tasks);
    await db.categories.bulkAdd(json.categories);
    await db.memos.bulkAdd(json.memos);
    await db.memoTags.bulkAdd(json.memoTags);
  });
}

/** インポート対象かどうかのチェック関数 */
export const isImportData = (
  json:
    | ImportData
    | {
        dailyData: unknown;
        taskLogs: unknown;
        tasks: unknown;
        categories: unknown;
        memos: unknown;
        memoTags: unknown;
      }
): json is ImportData => {
  return (
    typeof json === "object" &&
    json !== null &&
    "dailyData" in json &&
    "taskLogs" in json &&
    "tasks" in json &&
    "categories" in json &&
    "memos" in json &&
    "memoTags" in json
  );
};

/** データベースの全テーブルをクリアする関数(スキーマは保持してデータだけ消す) */
export async function clearAllTables() {
  const tables = getAllTables();
  // トランザクションで処理することで失敗時にロールバック可能に
  await db.transaction("rw", tables, async () => {
    //
    await Promise.all(tables.map((table) => table.clear()));
  });
}
