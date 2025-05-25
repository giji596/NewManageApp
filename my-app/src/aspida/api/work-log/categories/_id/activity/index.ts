import { CategoryActivityRange } from "@/type/Category";
import { CategoryTaskActivity } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: {
      range?: CategoryActivityRange;
      start?: string;
      end?: string;
    };
    resBody: CategoryTaskActivity[];
  };
}>;
