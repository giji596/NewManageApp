import { ReplaceDateWithString } from "@/type/common";
import { TaskOption, TaskSummary, TaskSummaryRangeQuery } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: TaskSummaryRangeQuery;
    resBody: ReplaceDateWithString<TaskSummary>[];
  };
  post: {
    reqBody: {
      name: string;
      categoryId: number;
      isFavorite: boolean;
    };
    resBody: TaskOption;
  };
}>;
