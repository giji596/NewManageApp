import { DateSummary } from "@/type/Date";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { query?: { year: string; month: string }; resBody: DateSummary[] };
}>;
