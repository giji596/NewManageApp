import { DateDetailPage } from "@/type/Date";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { resBody: DateDetailPage };
}>;
