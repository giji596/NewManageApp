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
  // データなかったらnull返す
  if (!data) return null;

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
