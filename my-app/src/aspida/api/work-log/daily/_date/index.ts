import { ReplaceDateWithString } from "@/type/common";
import { DateDetailPage } from "@/type/Date";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { resBody: ReplaceDateWithString<DateDetailPage> };
}>;
