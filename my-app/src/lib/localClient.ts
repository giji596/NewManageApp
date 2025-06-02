import { CategoryHeaderQuery } from "@/type/Category";
import {
  createCategory,
  deleteCategory,
  getCategoryActivity,
  getCategoryOptions,
  getCategorySummary,
  getCategoryTasks,
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
  getLastMonthTaskProgress,
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
  getLogMemoTitleList,
  getMemoBody,
  updateMemo,
} from "./local-services/memoService";
import {
  getDailySummaryData,
  getDailySummaryDetailData,
  getRecentWorkTime,
} from "./local-services/dailySummaryService";
import { TaskSummaryRangeQuery } from "@/type/Task";
import {
  BulkUpdateTaskBody,
  CreateCategoryBody,
  CreateDailyDetailDataBody,
  CreateMemoBody,
  CreateTagBody,
  CreateTaskBody,
  UpdateMemoBody,
  UpdateTaskBody,
  UpdateUniqueTaskLogBody,
} from "@/type/Request";
import {
  CategoryActivityQuery,
  DateListQuery,
  DateSummaryDetailQuery,
  TaskOptionQuery,
} from "@/type/Query";

export const localClient = {
  work_log: {
    daily: {
      _date: (date: string) => {
        return {
          task_logs: {
            _id: (id: number) => {
              return {
                patch: ({ body }: { body: UpdateUniqueTaskLogBody }) =>
                  updateTaskLog(id, body),
                delete: () => deleteTaskLog(id),
                memos: {
                  titles: {
                    get: () => () => getLogMemoTitleList(id),
                  },
                },
              };
            },
            post: ({ body }: { body: CreateDailyDetailDataBody }) =>
              createDailyDetailData(date, body),
          },
          get: () => () => getDailyDetailData(date),
        };
      },
      summary: {
        get:
          ({ query }: { query?: DateListQuery }) =>
          () =>
            getDailySummaryData({ query }),
        detail: {
          get:
            ({ query }: { query: DateSummaryDetailQuery }) =>
            () =>
              getDailySummaryDetailData(query),
        },
      },
      recent_work_time: {
        get: () => () => getRecentWorkTime(),
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
          patch: ({ body }: { body: UpdateTaskBody }) =>
            updateTaskDetail(id, body),
          delete: () => deleteTask(id),
          progress: {
            get: () => () => getTaskProgress(id),
          },
        };
      },
      post: ({ body }: { body: CreateTaskBody }) => createTask(body),
      options: {
        get:
          ({ query }: { query: TaskOptionQuery }) =>
          () =>
            getTaskOptions(query),
      }, //TODO
      activities: {
        last_month: {
          get: () => () => getLastMonthTaskActivities(),
        },
      },
      progress: { last_month: { get: () => () => getLastMonthTaskProgress() } },
      bulk_update: {
        patch: ({ body }: { body: BulkUpdateTaskBody }) => bulkUpdateTask(body),
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
              ({ query }: { query: CategoryActivityQuery }) =>
              () =>
                getCategoryActivity(id, query),
          },
          tasks: {
            get: () => () => getCategoryTasks(id),
          },
        };
      },
      post: ({ body }: { body: CreateCategoryBody }) => createCategory(body),
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
          patch: ({ body }: { body: UpdateMemoBody }) => updateMemo(id, body),
          body: { get: () => () => getMemoBody(id) },
          delete: () => deleteMemo(id),
        };
      },
      post: ({ body }: { body: CreateMemoBody }) => createMemo(body),
    },
    tags: {
      get: () => () => getMemoTags(),
      post: ({ body }: { body: { tagName: string } }) =>
        createTag(body.tagName),
      _id: (id: number) => {
        return {
          patch: ({ body }: { body: CreateTagBody }) =>
            updateTagName(body, Number(id)),
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
