-- CreateTable
CREATE TABLE "DailyData" (
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TaskLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "workTime" REAL NOT NULL,
    CONSTRAINT "TaskLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_date_fkey" FOREIGN KEY ("date") REFERENCES "DailyData" ("date") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Memo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "taskLogId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "Memo_taskLogId_fkey" FOREIGN KEY ("taskLogId") REFERENCES "TaskLog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Memo_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "MemoTag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MemoTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyData_date_key" ON "DailyData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MemoTag_name_key" ON "MemoTag"("name");
