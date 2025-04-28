import { ReplaceDateWithString } from "@/type/common";
import { TaskDetail } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: ReplaceDateWithString<TaskDetail>;
  };
  patch: {
    reqBody: {
      taskName?: string;
      categoryId?: number;
      isFavorite?: boolean;
      progress?: number;
    };
    resBody: { id: number };
  };
  delete: { resBody: { id: number } };
}>;
