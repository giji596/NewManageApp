import { DailyWorkTime } from "@/type/Main";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: DailyWorkTime[];
  };
}>;
