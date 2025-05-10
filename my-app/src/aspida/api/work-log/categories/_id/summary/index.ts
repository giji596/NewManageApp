import { CategorySummary } from "@/type/Category";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: CategorySummary;
  };
}>;
