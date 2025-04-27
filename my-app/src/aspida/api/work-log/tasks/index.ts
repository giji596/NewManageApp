import { ReplaceDateWithString } from "@/type/common";
import { TaskOption, TaskSummary } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: ReplaceDateWithString<TaskSummary>[];
  };
  post: {
    reqBody: { name: string; categoryId: number; isFavorite: boolean };
    resBody: TaskOption;
  };
}>;
