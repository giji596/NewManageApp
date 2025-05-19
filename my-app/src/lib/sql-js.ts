import initSqlJs, { Database } from "sql.js";

/** IndexedDB上のDB名 */
const DB_NAME = "MyAppDB";
/** IndexedDB上のDBのストア名 */
const STORE_NAME = "SQLiteStore";
/** IndexedDB上のDBのKey名 */
const KEY_NAME = "sqlite-db";

/** データベースのインスタンス(メモリ上に保持することで高速化) */
let dbInstance: Database | null = null;

/**
 * スキーマに則ってデータベースを作成するロジック
 */
async function createDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE DailyData (
      date TEXT PRIMARY KEY
    );

    CREATE TABLE Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      isCompleted BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE Task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      categoryId INTEGER NOT NULL,
      progress INTEGER NOT NULL,
      isFavorite BOOLEAN NOT NULL,
      firstActivityDate TEXT,
      lastActivityDate TEXT,
      FOREIGN KEY (categoryId) REFERENCES Category(id)
    );

    CREATE TABLE TaskLog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskId INTEGER NOT NULL,
      date TEXT NOT NULL,
      workTime REAL NOT NULL,
      FOREIGN KEY (taskId) REFERENCES Task(id),
      FOREIGN KEY (date) REFERENCES DailyData(date)
    );

    CREATE TABLE MemoTag (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE Memo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      taskLogId INTEGER NOT NULL,
      tagId INTEGER,
      FOREIGN KEY (taskLogId) REFERENCES TaskLog(id),
      FOREIGN KEY (tagId) REFERENCES MemoTag(id)
    );
  `);

  return db;
}

/** IndexedDBからロードする関数 */
async function loadDbFromIndexedDB(): Promise<number[] | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(KEY_NAME);
      getRequest.onsuccess = () => {
        resolve(getRequest.result || null);
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME);
    };
  });
}

/** IndexedDBに保存する関数 */
async function saveDbToIndexedDB(data: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const putRequest = store.put(Array.from(data), KEY_NAME);
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME);
    };
  });
}

/**
 * IndexedDBからデータベースをロードまたは存在しない場合は作成する関数
 * @returns データベース
 */
export async function loadOrCreateDatabase() {
  const SQL = await initSqlJs();

  const dbData = await loadDbFromIndexedDB();

  if (dbData) {
    // IndexedDBに保存されていたら復元
    return new SQL.Database(new Uint8Array(dbData));
  }

  // なければ新規作成
  const db = await createDatabase();

  // 保存
  const data = db.export();
  await saveDbToIndexedDB(data);

  return db;
}
/**
 * データベースを取得する関数 初期以降であればインスタンスから取得 それ以外はインスタンスを作成
 * @returns dbのインスタンス
 */
export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  dbInstance = await loadOrCreateDatabase(); // IndexedDBにあるならそれを読み込み
  return dbInstance;
}
