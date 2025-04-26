import { DailyDetailTaskTableType } from "@/type/Task";
import prisma from "../prisma";
import { MemoDailyTask } from "@/type/Memo";

/**
 * 日付詳細ページのデータをDBから取得する関数
 */
export const getDailyDetailData = async (date: Date) => {
  const data = await prisma.dailyData.findUnique({
    where: { date: date },
    select: {
      date: true,
      logs: {
        select: {
          id: true,
          task: { select: { id: true, name: true, category: true } },
          workTime: true,
          memos: {
            select: {
              id: true,
              title: true,
              text: true,
              taskLog: {
                select: { task: { select: { id: true, name: true } } },
              },
            },
          },
        },
      },
    },
  });
  // データなかったら新規作成後、null返す
  if (!data) {
    console.log("aaaaa");
    await prisma.dailyData.create({ data: { date } });
    return null;
  }

  const taskList: DailyDetailTaskTableType[] = [];
  const memoList: MemoDailyTask[] = [];

  data.logs.forEach((log) => {
    const { id, task, workTime, memos } = log;

    // Task情報をまとめておく（1タスクに複数ログがあっても集約）
    taskList.push({
      id: id,
      task: { id: task.id, name: task.name },
      category: {
        id: task.category.id,
        name: task.category.name,
      },
      dailyHours: workTime,
    });

    // メモを整形して格納
    memos.forEach((memo) => {
      memoList.push({
        id: memo.id,
        title: memo.title,
        summary: memo.text.slice(0, 30),
        task: {
          id: memo.taskLog.task.id,
          name: memo.taskLog.task.name,
        },
      });
    });
  });

  return {
    date: data.date,
    taskList,
    memoList,
  };
};

/**
 * 日付詳細 - タスク追加ダイアログによる追加時のロジック
 */
export const createDailyDetailData = async (date: Date, taskId: number) => {
  // すでに同じタスクidがある場合はnullを返す
  const existing = await prisma.taskLog.findFirst({ where: { date, taskId } });
  if (existing) return null;
  const data = await prisma.taskLog.create({
    data: { taskId, date, workTime: 0 },
  });
  return data;
};

/**
 * 日付詳細 - 特定のログの更新する時のロジック
 */
export const updateTaskLog = async (
  id: number,
  taskId?: number,
  workTime?: number
) => {
  const data = await prisma.taskLog.update({
    where: { id },
    data: {
      // undefinedの場合は更新対象から除く
      ...(taskId !== undefined && { taskId }),
      ...(workTime !== undefined && { workTime }),
    },
    select: {
      id: true,
    },
  });
  return data;
};

/**
 * タスクログを削除するロジック
 */
export const deleteTaskLog = async (id: number) => {
  const data = await prisma.taskLog.delete({
    where: { id },
    select: { id: true },
  });
  return data;
};
