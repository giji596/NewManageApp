import { CategoryHeaderQuery } from "@/type/Category";
import {
  createCategory,
  getCategoryOptions,
} from "./local-services/categoryService";
import {
  createDailyDetailData,
  getDailyDetailData,
} from "./local-services/dailyDetailService";
import {
  createTask,
  getLastMonthTaskActivities,
  getTaskOptions,
} from "./local-services/taskService";
import {
  createTag,
  deleteTag,
  getMemoTags,
  getTagUsageMemoTitlesAndCount,
  getTagWithUsage,
  updateTagName,
} from "./local-services/tagService";
import { createMemo } from "./local-services/memoService";

export const localClient = {
  work_log: {
    daily: {
      _date: (date: string) => {
        return {
          task_logs: {
            post: ({ body }: { body: { taskId: number } }) =>
              createDailyDetailData(date, body.taskId),
          },
          get: () => () => getDailyDetailData(date),
        };
      },
    },
    tasks: {
      post: ({
        body,
      }: {
        body: { name: string; categoryId: number; isFavorite: boolean };
      }) => createTask(body.name, body.categoryId, body.isFavorite),
      options: {
        get:
          ({ query }: { query: { categoryId: number } }) =>
          () =>
            getTaskOptions(query.categoryId),
      }, //TODO
      activities: {
        last_month: {
          get: () => () => getLastMonthTaskActivities(),
        },
      },
    },
    categories: {
      post: ({ body }: { body: { name: string } }) => createCategory(body.name),
      options: {
        get:
          ({ query }: { query?: CategoryHeaderQuery }) =>
          () =>
            getCategoryOptions(query),
      },
    },
    memos: {
      post: ({
        body,
      }: {
        body: {
          title: string;
          text: string;
          taskLogId: number;
          tagId?: number;
        };
      }) => createMemo(body.title, body.text, body.taskLogId, body.tagId),
    },
    tags: {
      get: () => () => getMemoTags(),
      post: ({ body }: { body: { tagName: string } }) =>
        createTag(body.tagName),
      _id: (id: number) => {
        return {
          patch: ({ body }: { body: { name: string } }) =>
            updateTagName(body.name, Number(id)),
          delete: () => deleteTag(id),
          usage: { get: () => () => getTagUsageMemoTitlesAndCount(id) },
        };
      },
      with_usage: {
        get: () => () => getTagWithUsage(),
      },
    },
  },
};
