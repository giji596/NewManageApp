import { TagUsage } from "@/type/Tag";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: TagUsage;
  };
}>;
