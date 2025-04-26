-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Memo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "taskLogId" INTEGER NOT NULL,
    "tagId" INTEGER,
    CONSTRAINT "Memo_taskLogId_fkey" FOREIGN KEY ("taskLogId") REFERENCES "TaskLog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Memo_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "MemoTag" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Memo" ("id", "tagId", "taskLogId", "text", "title") SELECT "id", "tagId", "taskLogId", "text", "title" FROM "Memo";
DROP TABLE "Memo";
ALTER TABLE "new_Memo" RENAME TO "Memo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
