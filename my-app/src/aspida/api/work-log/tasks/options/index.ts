import { TaskOption } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { query: { categoryId: number }; resBody: TaskOption[] };
}>;
