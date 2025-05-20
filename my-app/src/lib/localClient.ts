import { getDailyDetailData } from "./local-services/dailyDetailService";
import { getLastMonthTaskActivities } from "./local-services/taskService";

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
      activities: {
        last_month: {
          get: () => () => getLastMonthTaskActivities(),
        },
      },
    },
  },
};
