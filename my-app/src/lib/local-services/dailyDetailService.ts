import { DailyDetailTaskTableType } from "@/type/Task";
import { db } from "../dexie";
import { MemoDailyTask } from "@/type/Memo";

/**
 * 日付詳細ページのデータをDBから取得する関数
 */
export const getDailyDetailData = async (date: string) => {
  const exist = await db.dailyData.where("date").equals(date).toArray();
  // データなかったら新規作成後、null返す
  if (exist.length === 0) {
    await db.dailyData.add({ date });
    return null;
  }

  // ログ取得
  const logs = await db.taskLogs.where("date").equals(date).toArray();
  // ログid一覧(メモ検索用)
  const logsIdList = [...new Set(logs.map((v) => v.id))];
  // タスクのid一覧
  const logsTaskIdList = [...new Set(logs.map((v) => v.taskId))];
  // タスクの一覧(タスク名取得用 logに関連あるものだけ)
  const logTaskList = await db.tasks
    .where("id")
    .anyOf(logsTaskIdList)
    .toArray();
  // カテゴリのid一覧
  const logsCategoryIdList = [...new Set(logTaskList.map((v) => v.categoryId))];
  // カテゴリの一覧(カテゴリ名取得用 logに関連あるものだけ)
  const logCategoryList = await db.categories
    .where("id")
    .anyOf(logsCategoryIdList)
    .toArray();
  // メモ一覧
  const memoList = await db.memos
    .where("taskLogId")
    .anyOf(logsIdList)
    .toArray();
  // タグID一覧
  const tagIdList = [...new Set(memoList.map((v) => (v.tagId ? v.tagId : 0)))];
  // タグ一覧
  const tagList = await db.memoTags.where("id").anyOf(tagIdList).toArray();

  // データ整形
  const tasks: DailyDetailTaskTableType[] = logs.map((log) => {
    // そのまま取得
    const id = log.id;
    const dailyHours = log.workTime;
    // タスク/カテゴリは一覧から名前を取得してひっつける
    const taskData = logTaskList.find((v) => v.id === log.taskId)!;
    const task = { id: taskData.id, name: taskData.name };
    const categoryData = logCategoryList.find(
      (v) => v.id === taskData.categoryId
    )!;
    const category = { id: categoryData.id, name: categoryData.name };
    // タスクの完了かどうかはtaskのprogressの値が100かどうかで判定
    const isCompletedTask = taskData.progress === 100;
    return {
      id,
      task,
      category,
      dailyHours,
      isCompletedTask,
    };
  });
  const memos: MemoDailyTask[] = memoList.map((item) => {
    const id = item.id;
    const title = item.title;
    const summary =
      item.text.length > 30 ? `${item.text.slice(0, 30)}...` : item.text;
    const taskData = logTaskList.find(
      (task) =>
        task.id === logs.find((log) => log.id === item.taskLogId)!.taskId
    )!;
    const task = { id: taskData.id, name: taskData.name };
    let tagName: string;
    // idがある場合はfindで探す
    if (item.tagId) {
      const tagData = tagList.find((v) => v.id === item.tagId)!;
      tagName = tagData.name;
    } else {
      // idない場合は未選択に
    }
    tagName = "未選択";
    return {
      id,
      title,
      summary,
      task,
      tagName,
    };
  });
  return {
    date,
    taskList: tasks,
    memoList: memos,
  };
};
