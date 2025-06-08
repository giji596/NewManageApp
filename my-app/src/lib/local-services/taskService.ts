import { subMonths } from "date-fns";
import { db } from "../dexie";
import { MainPagePieChart } from "@/type/Main";
import {
  CalendarDateMap,
  TaskDetail,
  TaskOption,
  TaskSummary,
  TaskSummaryRangeQuery,
} from "@/type/Task";
import {
  BulkUpdateTaskBody,
  CreateTaskBody,
  UpdateTaskBody,
} from "@/type/Request";
import { TaskOptionQuery } from "@/type/Query";

/**
 * タスク選択賜一覧げっとする関数
 */
export const getTaskOptions = async ({ categoryId }: TaskOptionQuery) => {
  // カテゴリidが一致するデータを取得
  const data = await db.tasks.where("categoryId").equals(categoryId).toArray();
  const result: TaskOption[] = data
    .filter((v) => v.progress !== 100) // 完了済みを除外する
    .sort((a, b) => {
      const aDate = a?.lastActivityDate ?? "";
      const bDate = b?.lastActivityDate ?? "";
      return bDate.localeCompare(aDate);
    })
    .map((v) => {
      return { id: v.id, name: v.name }; // 必要なパラメータだけ取得
    });
  // データが空の場合はid:0で表示
  if (result.length === 0) result.push({ id: 0, name: "タスクがありません" });
  return result;
};

/**
 * タスク一覧ページのデータを取得する関数
 */
export const getTaskSummary = async (
  query?: TaskSummaryRangeQuery
): Promise<TaskSummary[]> => {
  const { progress, firstActivityDate, lastActivityDate, activeOnly } =
    query ?? {}; // undefinedの場合{}となり、参照keyがないので左辺の全てのkeyはundefinedになる

  const tasks = await db.tasks.toArray();

  const filteredTasks = tasks.filter((task) => {
    // 進捗フィルタ (デフォだと0~90)
    const progressFilter =
      // 最低値
      task.progress >= (progress?.split(",").map((v) => Number(v))[0] ?? 0) &&
      // 最高値
      task.progress <= (progress?.split(",").map((v) => Number(v))[1] ?? 90);

    // 開始日フィルタ(ある場合のみ実行)
    const firstActivityFilter =
      // なければ即trueでfilterしない
      firstActivityDate === undefined ||
      (task.firstActivityDate &&
        // 最小
        new Date(task.firstActivityDate) >=
          firstActivityDate.split(",").map((v) => new Date(v))[0] &&
        // 最大
        new Date(task.firstActivityDate) <=
          firstActivityDate.split(",").map((v) => new Date(v))[1]);

    // 最終更新日フィルタ(ある場合のみ実行)
    const lastActivityFilter =
      // なければ即trueでfilterしない
      lastActivityDate === undefined ||
      (task.lastActivityDate &&
        // 最小
        new Date(task.lastActivityDate) >=
          lastActivityDate.split(",").map((v) => new Date(v))[0] &&
        // 最大
        new Date(task.lastActivityDate) <=
          lastActivityDate.split(",").map((v) => new Date(v))[1]);

    // アクティブフィルタ(ある場合のみ実行)
    const activeFilter =
      activeOnly === undefined || (activeOnly && task.progress !== 100);

    return (
      progressFilter &&
      firstActivityFilter &&
      lastActivityFilter &&
      activeFilter
    );
  });

  const result: TaskSummary[] = await Promise.all(
    filteredTasks.map(async (task) => {
      const category = await db.categories.get(task.categoryId);
      const taskLogs = await db.taskLogs
        .where("taskId")
        .equals(task.id)
        .toArray();
      const totalHours = taskLogs.reduce((a, b) => a + b.workTime, 0);

      return {
        id: task.id,
        taskName: task.name,
        isFavorite: task.isFavorite,
        categoryName: category?.name ?? "未分類",
        progress: task.progress,
        totalHours: totalHours,
        firstActivityDate: task.firstActivityDate
          ? new Date(task.firstActivityDate)
          : null,
        lastActivityDate: task.lastActivityDate
          ? new Date(task.lastActivityDate)
          : null,
      };
    })
  );

  return result;
};

/**
 * メインページで過去一ヶ月に稼働があるタスクの進捗を取得するロジック
 */
export const getLastMonthTaskProgress = async () => {
  const oneMonthAgo = subMonths(new Date(), 1).toISOString();

  // 一ヶ月以内に更新があるタスクを取得
  const tasks = await db.tasks.toArray();
  const lastMonthTasks = tasks.filter((task) => {
    const lastActivityDate = task.lastActivityDate;
    // 更新日がないものは除外
    if (lastActivityDate === undefined) return false;
    // 更新日が一ヶ月以内のものを取得
    return lastActivityDate >= oneMonthAgo;
  });
  const result = lastMonthTasks
    .sort((a, b) => b.progress - a.progress)
    .map((task) => {
      return { id: task.id, name: task.name, progress: `${task.progress}%` };
    });

  return result;
};

/**
 * タスク詳細データ取得ロジック
 */
export const getTaskDetail = async (id: number) => {
  const task = await db.tasks.get(id);

  if (task) {
    // 各データを取得
    const category = await db.categories.get(task.categoryId);
    if (category === undefined) {
      throw new Error("Category not found");
    }
    const taskLogs = await db.taskLogs.where("taskId").equals(id).toArray();
    const taskLogIds = taskLogs.map((v) => v.id);
    const memos = await db.memos.where("taskLogId").anyOf(taskLogIds).toArray();
    const tags = await db.memoTags.toArray();
    // 総稼働時間を計算
    const totalHours = taskLogs.reduce((a, b) => a + b.workTime, 0);

    // 稼働日付の一覧
    const dateList = taskLogs.map((v) => v.date);

    // 送信用のデータを作成
    const workDateList: CalendarDateMap = {};
    for (const date of dateList) {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth() + 1; // 1-indexed
      const day = new Date(date).getDate();
      const key = `${year}-${month}`;
      if (!workDateList[key]) {
        workDateList[key] = [];
      }
      workDateList[key].push(day);
    }

    // メモを整形
    const formattedMemos = memos.map((memo) => {
      // タグIDがある場合はタグ名を取得
      const tag = memo.tagId
        ? tags.find((v) => v.id === memo.tagId)!.name // !付けているのは、必ず見つかるため
        : "未選択";
      const date = taskLogs.find((v) => v.id === memo.taskLogId)!.date; // !つけているのは、必ず見つかるため
      const summary =
        memo.text.length > 30 ? `${memo.text.slice(0, 30)}...` : memo.text;
      return {
        id: memo.id,
        date: new Date(date),
        title: memo.title,
        tag: tag,
        summary: summary,
      };
    });

    const result: TaskDetail = {
      id: task.id,
      name: task.name,
      isFavorite: task.isFavorite,
      category: { id: category.id, name: category.name },
      progress: task.progress,
      totalHours: totalHours,
      firstActivityDate: task.firstActivityDate
        ? new Date(task.firstActivityDate).toISOString()
        : null,
      lastActivityDate: task.lastActivityDate
        ? new Date(task.lastActivityDate).toISOString()
        : null,
      memo: formattedMemos,
      workDateList,
    };

    return result;
  }

  // データがない場合はnull
  return null;
};

/**
 * タスク作成する関数
 */
export const createTask = async ({
  name,
  categoryId,
  isFavorite,
}: CreateTaskBody) => {
  // 重複チェック
  const categoryTaskList = await db.tasks.where({ categoryId }).toArray();
  const existing = categoryTaskList.find((v) => v.name === name);
  if (existing !== undefined) throw new Error("duplicate error");

  // くりえーとする
  const id = await db.tasks.add({
    name,
    categoryId,
    isFavorite,
    progress: 0,
  });

  return { id, name };
};

/**
 * タスクを一括更新するメソッド(一覧ページで利用)
 */
export const bulkUpdateTask = async (updateData: BulkUpdateTaskBody) => {
  const updates = updateData.map(async (v) => {
    const updateFields: Partial<{ progress: number; isFavorite: boolean }> = {};
    if (v.progress !== undefined) {
      updateFields.progress = v.progress;
    }
    if (v.isFavorite !== undefined) {
      updateFields.isFavorite = v.isFavorite;
    }
    return db.tasks.update(v.id, updateFields);
  });

  await Promise.all(updates);

  return updateData.map((v) => ({ id: v.id }));
};

/**
 * タスクの詳細を更新するメソッド
 */
export const updateTaskDetail = async (
  id: number,
  { taskName, categoryId, isFavorite, progress }: UpdateTaskBody
) => {
  // 重複チェック
  // 元データを取得
  const targetData = await db.tasks.get(id);
  if (targetData === undefined) throw new Error("not found error");

  // カテゴリのタスク一覧を取得
  const categoryTaskList = await db.tasks
    .where({
      categoryId: categoryId === undefined ? targetData.categoryId : categoryId, // 変更する場合はそれの、そうでなければtargetのIDから取得
    })
    .toArray();
  // idが元データと異なり、同名のデータがある場合重複エラーを出す
  const existing = categoryTaskList.find(
    (v) =>
      v.id !== id && // 元データを除外
      v.name ===
        (taskName !== undefined // 名前を変更する場合は変更後の、そうでなければ元データの名前を取得
          ? taskName
          : targetData.name)
  );
  if (existing !== undefined) throw new Error("duplicate error");

  const updateData: Partial<{
    name: string;
    categoryId: number;
    isFavorite: boolean;
    progress: number;
  }> = {};

  if (taskName !== undefined) {
    updateData.name = taskName;
  }
  if (categoryId !== undefined) {
    updateData.categoryId = categoryId;
  }
  if (isFavorite !== undefined) {
    updateData.isFavorite = isFavorite;
  }
  if (progress !== undefined) {
    updateData.progress = progress;
  }

  const updated = await db.tasks.update(id, updateData);
  if (!updated) {
    throw new Error("Task not found or update failed");
  }
  return { id };
};
/**
 * タスクを削除するメソッド
 */
export const deleteTask = async (id: number) => {
  const exist = await db.taskLogs.where("taskId").equals(id).first();
  // 関連するタスクがある場合エラー
  if (exist) {
    throw new Error("relationship error");
  }
  // ない場合は削除
  await db.tasks.delete(id);
  return { id };
};

/**
 * メインページ用の一ヶ月分のカテゴリ別の稼働をとってくるロジック
 */
export const getLastMonthTaskActivities = async () => {
  // 現在と一ヶ月前のDateを取得
  const now = new Date();
  const oneMonthAgo = subMonths(now, 1);
  // DBの比較用にstring("yyyy-mm-dd")形式に変更
  const fromDate = oneMonthAgo.toISOString();
  const toDate = now.toISOString();

  // 日付内の稼働を全て取得
  const logActiveLastMonth = await db.taskLogs
    .where("date")
    .between(fromDate, toDate)
    .toArray();
  // 0時間の稼働は含めない
  const filteredLog = logActiveLastMonth.filter((v) => v.workTime !== 0);

  // 全体の合計時間
  const totalHours = filteredLog.reduce((a, b) => a + b.workTime, 0);
  // タスクごとの時間(id + hours)
  const totalTaskHours = filteredLog.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.id === item.taskId);
    if (existing) {
      existing.hours += item.workTime;
    } else {
      acc.push({ id: item.taskId, hours: item.workTime });
    }
    return acc;
  }, [] as { id: number; hours: number }[]);

  // タスクのid一覧
  const taskIdList = [...new Set(filteredLog.map((v) => v.taskId))];
  // タスク一覧
  const taskList = await db.tasks.where("id").anyOf(taskIdList).toArray();

  // カテゴリごとの時間(id + hours)
  const totalCategoryHours = taskList.reduce((acc, item) => {
    // 存在とタスクの稼働時間を取得
    const existing = acc.find((entry) => entry.id === item.categoryId);
    const workTime = totalTaskHours.find((v) => v.id === item.id)!.hours; // 元データなのでundefinedにならない
    if (existing) {
      existing.hours += workTime;
    } else {
      acc.push({ id: item.categoryId, hours: workTime });
    }
    return acc;
  }, [] as { id: number; hours: number }[]);

  // カテゴリ一ID覧を取得
  const categoryIdList = [...new Set(taskList.map((v) => v.categoryId))];
  // カテゴリ一覧
  const categoryList = await db.categories
    .where("id")
    .anyOf(categoryIdList)
    .toArray();
  const result: MainPagePieChart[] = categoryList.map((v) => {
    const id = v.id;
    const name = v.name;
    const categoryHours = totalCategoryHours.find(
      (item) => item.id === v.id
    )!.hours;
    const value = (categoryHours * 1000) / totalHours;
    const task = taskList
      .filter((item) => item.categoryId === v.id)
      .map((item) => {
        const taskName = item.name;
        const hours = totalTaskHours.find(
          (hours) => hours.id === item.id
        )!.hours;
        return { name: taskName, hours: `${hours}(h)` };
      })
      .sort((a, b) => {
        const aHours = parseFloat(a.hours.split("(")[0]);
        const bHours = parseFloat(b.hours.split("(")[0]);
        return bHours - aHours;
      });
    return {
      id,
      name,
      value,
      task,
    };
  });

  return result;
};

/**
 * 指定された日時に基づいて、タスクの firstActivityDate および lastActivityDate を必要に応じて更新します。
 * - firstActivityDate が未設定、または指定日時より後であれば、指定日時に更新します。
 * - lastActivityDate が未設定、または指定日時より前であれば、指定日時に更新します。
 */
export const updateTaskActivityDatesIfNeeded = async (
  date: string,
  taskId: number
) => {
  // タスクの更新日を取得
  const target = await db.tasks.get(taskId);

  if (!target) {
    throw new Error("Task not found");
  }

  // 更新データ用のオブジェクトを作成
  const updateData: Partial<{
    firstActivityDate: string;
    lastActivityDate: string;
  }> = {};

  // 開始日について、対象のタスクが存在しかつ開始日がないか未来の日付の場合に更新処理のキューに含める
  if (
    target.firstActivityDate === undefined ||
    target.firstActivityDate === null ||
    target.firstActivityDate > date
  ) {
    updateData.firstActivityDate = date;
  }

  // 最終実施日について、対象のタスクが存在しかつ更新日がないか過去の日付の場合に更新処理のキューに含める
  if (
    target.lastActivityDate === undefined ||
    target.lastActivityDate === null ||
    target.lastActivityDate < date
  ) {
    updateData.lastActivityDate = date;
  }

  // updateDataに更新内容が含まれている場合は更新処理を実行
  if (Object.keys(updateData).length > 0) {
    await db.tasks.update(taskId, updateData);
  }
};

/**
 * 指定された日時が、タスクの firstActivityDate または lastActivityDate と一致する場合に、
 * タスクログの削除や移動（taskId の変更）によって失われた日付情報を補うため、
 * 該当する日付を次に新しい日時に更新します。
 *
 * - firstActivityDate と一致する場合は、それより後の最も古い日時に更新します。
 * - lastActivityDate と一致する場合は、それより前の最も新しい日時に更新します。
 *
 * タスクログ削除や再割り当て後の整合性維持に使用されます。
 */
export const adjustTaskActivityDatesIfRemoved = async (
  deletedDate: string,
  taskId: number
) => {
  // タスクの日付を取得
  const target = await db.tasks.get(taskId);

  if (!target) {
    throw new Error("Task not found");
  }

  // 更新データをオブジェクトで宣言
  // undefined: 更新しない, null: nullに更新, Date: 新しい日付で更新
  const updateData: Record<"first" | "last", string | null | undefined> = {
    first: undefined,
    last: undefined,
  };

  // firstActivityDate が削除対象と一致 → 最も古い他のログを探す
  if (target.firstActivityDate === deletedDate) {
    const previous = await db.taskLogs
      .where("taskId")
      .equals(taskId)
      .sortBy("date");
    // 更新のキューに加える(ログが一つもない場合はnullを与える)
    updateData.first = previous.length > 0 ? previous[0].date : null;
  }

  // lastActivityDate が削除対象と一致 → 最も新しい他のログを探す
  if (target.lastActivityDate === deletedDate) {
    const previous = await db.taskLogs
      .where("taskId")
      .equals(taskId)
      .sortBy("date");
    // 更新のキューに加える(ログが一つもない場合はnullを与える)
    updateData.last =
      previous.length > 0 ? previous[previous.length - 1].date : null;
  }

  // 更新処理を実行
  await db.tasks.update(taskId, {
    ...(typeof updateData.first !== "undefined" && {
      firstActivityDate: updateData.first ?? undefined, //nullを与えた場合(ログがない場合)はundefinedに更新
    }),
    ...(typeof updateData.last !== "undefined" && {
      lastActivityDate: updateData.last ?? undefined, // nullを与えた場合(ログがない場合)はundefinedに更新
    }),
  });
};

/**
 * タスクの進捗を取得する関数
 */
export const getTaskProgress = async (id: number) => {
  const data = await db.tasks.get(id);
  return data ? { progress: data.progress } : null;
};
