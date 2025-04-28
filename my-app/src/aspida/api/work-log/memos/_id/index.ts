import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: {
    reqBody: { title?: string; text?: string; tagId?: number };
    resBody: { id: number };
  };
  delete: {
    resBody: { id: number };
  };
}>;
