import { TagEditListItem } from "@/type/Tag";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: TagEditListItem[];
  };
}>;
