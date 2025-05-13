import { DailyDetailTaskTableType } from "@/type/Task";
import prisma from "../prisma";
import { MemoDailyTask } from "@/type/Memo";
import {
  adjustTaskActivityDatesIfRemoved,
  updateTaskActivityDatesIfNeeded,
} from "./taskService";

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
              tag: { select: { name: true } },
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
      // 30文字以上であればスライスして「...」を末尾につける
      const text =
        memo.text.length > 30 ? `${memo.text.slice(0, 30)}...` : memo.text;
      memoList.push({
        id: memo.id,
        title: memo.title,
        summary: text,
        task: {
          id: memo.taskLog.task.id,
          name: memo.taskLog.task.name,
        },
        tagName: memo.tag?.name ?? "未選択",
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
  // 追加後に必要であればタスクの最終更新日の更新処理を行う
  await updateTaskActivityDatesIfNeeded(date, taskId);
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
  // 更新前のデータのタスクidを取得
  const previous = await prisma.taskLog.findUnique({
    where: { id },
    select: { taskId: true },
  });
  //　ログデータの更新処理
  const data = await prisma.taskLog.update({
    where: { id },
    data: {
      // undefinedの場合は更新対象から除く
      ...(taskId !== undefined && { taskId }),
      ...(workTime !== undefined && { workTime }),
    },
    select: {
      id: true,
      date: true,
    },
  });
  // タスクの変更を含む場合(taskIdが存在する場合)
  // 必要に応じて最終更新日を更新する(元タスク:次点で新しい日付に変更 新規タスク:現在の日付に変更 )
  if (previous && taskId) {
    await adjustTaskActivityDatesIfRemoved(data.date, previous.taskId);
    await updateTaskActivityDatesIfNeeded(data.date, taskId);
  }
  if (previous && taskId === undefined)
    // タスクの変更を含まない場合は必要に応じて元タスクの最終更新日を更新する
    await updateTaskActivityDatesIfNeeded(data.date, previous.taskId);
  return { id: data.id };
};

/**
 * タスクログを削除するロジック
 */
export const deleteTaskLog = async (id: number) => {
  const data = await prisma.taskLog.delete({
    where: { id },
    select: { id: true, date: true, taskId: true },
  });
  // 必要に応じて元タスクの最終更新日を引き下げる
  await adjustTaskActivityDatesIfRemoved(data.date, data.taskId);
  return data;
};
