import { CategoryPanelQuery, CategoryOption } from "@/type/Category";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { query?: CategoryPanelQuery; resBody: CategoryOption[] };
}>;
