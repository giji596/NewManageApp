import { CategoryHeaderQuery, CategoryOption } from "@/type/Category";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { query?: CategoryHeaderQuery; resBody: CategoryOption[] };
}>;
