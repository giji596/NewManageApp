import { CategoryTaskList } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: CategoryTaskList[];
  };
}>;
