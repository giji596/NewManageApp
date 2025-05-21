import { CategoryHeaderQuery } from "@/type/Category";
import {
  createCategory,
  getCategoryOptions,
} from "./local-services/categoryService";
import { getDailyDetailData } from "./local-services/dailyDetailService";
import {
  getLastMonthTaskActivities,
  getTaskOptions,
} from "./local-services/taskService";

export const localClient = {
  work_log: {
    daily: {
      _date: (date: string) => {
        return {
          get: () => () => getDailyDetailData(date),
        };
      },
    },
    tasks: {
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
  },
};
