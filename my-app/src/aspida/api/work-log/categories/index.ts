import { CategoryOption } from "@/type/Category";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: { reqBody: { name: string }; resBody: CategoryOption }; // resはFEで使う予定ないけど通例に従って一応返す
}>;
