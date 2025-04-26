import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: { title: string; text: string; taskLogId: number; tagId?: number };
    resBody: { newId: number };
  };
}>;
