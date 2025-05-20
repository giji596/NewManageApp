import { getLastMonthTaskActivities } from "./local-services/taskService";

export const localClient = {
  work_log: {
    tasks: {
      activities: {
        last_month: {
          get: () => () => getLastMonthTaskActivities(),
        },
      },
    },
  },
};
