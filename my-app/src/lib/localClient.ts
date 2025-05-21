import { CategoryHeaderQuery } from "@/type/Category";
import {
  createCategory,
  deleteCategory,
  getCategoryActivity,
  getCategoryOptions,
  getCategorySummary,
  updateCategoryCompleted,
} from "./local-services/categoryService";
import {
  createDailyDetailData,
  deleteTaskLog,
  getDailyDetailData,
  updateTaskLog,
} from "./local-services/dailyDetailService";
import {
  createTask,
  getLastMonthTaskActivities,
  getTaskOptions,
  getTaskProgress,
  getTaskSummary,
  bulkUpdateTask,
  getTaskDetail,
  updateTaskDetail,
  deleteTask,
} from "./local-services/taskService";
import {
  createTag,
  deleteTag,
  getMemoTags,
  getTagUsageMemoTitlesAndCount,
  getTagWithUsage,
  updateTagName,
} from "./local-services/tagService";
import {
  createMemo,
  deleteMemo,
  getMemoBody,
  updateMemo,
} from "./local-services/memoService";
import {
  getDailySummaryData,
  getDailySummaryDetailData,
} from "./local-services/dailySummaryService";
import { TaskSummaryRangeQuery } from "@/type/Task";

export const localClient = {
  work_log: {
    daily: {
      _date: (date: string) => {
        return {
          task_logs: {
            _id: (id: number) => {
              return {
                patch: ({
                  body,
                }: {
                  body: {
                    taskId?: number;
                    workTime?: number;
                    progress?: number;
                  };
                }) =>
                  updateTaskLog(id, body.taskId, body.workTime, body.progress),
                delete: () => deleteTaskLog(id),
              };
            },
            post: ({ body }: { body: { taskId: number } }) =>
              createDailyDetailData(date, body.taskId),
          },
          get: () => () => getDailyDetailData(date),
        };
      },
      summary: {
        get:
          ({ query }: { query?: { year?: string; month?: string } }) =>
          () =>
            getDailySummaryData({ query }),
        detail: {
          get:
            ({ query }: { query: { date: string } }) =>
            () =>
              getDailySummaryDetailData(query.date),
        },
      },
    },
    tasks: {
      get:
        ({ query }: { query?: TaskSummaryRangeQuery }) =>
        () =>
          getTaskSummary(query),
      _id: (id: number) => {
        return {
          get: () => () => getTaskDetail(id),
          patch: ({
            body,
          }: {
            body: {
              taskName?: string;
              categoryId?: number;
              isFavorite?: boolean;
              progress?: number;
            };
          }) =>
            updateTaskDetail(
              id,
              body.taskName,
              body.categoryId,
              body.isFavorite,
              body.progress
            ),
          delete: () => deleteTask(id),
          progress: {
            get: () => () => getTaskProgress(id),
          },
        };
      },
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
      bulk_update: {
        patch: ({
          body,
        }: {
          body: { id: number; progress?: number; isFavorite?: boolean }[];
        }) => bulkUpdateTask(body),
      },
    },
    categories: {
      _id: (id: number) => {
        return {
          delete: () => deleteCategory(id),
          summary: {
            get: () => () => getCategorySummary(id),
          },
          complete: { patch: () => updateCategoryCompleted(id) },
          activity: {
            get:
              ({
                query,
              }: {
                query: {
                  range?: "last-month" | "all" | "select";
                  start?: string;
                  end?: string;
                };
              }) =>
              () =>
                getCategoryActivity(id, query.range, query.start, query.end),
          },
        };
      },
      post: ({ body }: { body: { name: string } }) => createCategory(body.name),
      options: {
        get:
          ({ query }: { query?: CategoryHeaderQuery }) =>
          () =>
            getCategoryOptions(query),
      },
    },
    memos: {
      _id: (id: number) => {
        return {
          patch: ({
            body,
          }: {
            body: { title?: string; text?: string; tagId?: number };
          }) => updateMemo(id, body.title, body.text, body.tagId),
          body: { get: () => () => getMemoBody(id) },
          delete: () => deleteMemo(id),
        };
      },
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
