import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: { resBody: { id: number } };
}>;
