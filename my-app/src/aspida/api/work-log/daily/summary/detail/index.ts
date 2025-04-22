import { DateSummaryDetail } from "@/type/Date";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: { date: string };
    resBody: DateSummaryDetail;
  };
}>;
