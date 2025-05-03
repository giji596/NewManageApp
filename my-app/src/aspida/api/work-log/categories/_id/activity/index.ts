import { CategoryTaskActivity } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: {
      range?: "last-month" | "all" | "select";
      start?: string;
      end?: string;
    };
    resBody: CategoryTaskActivity[];
  };
}>;
