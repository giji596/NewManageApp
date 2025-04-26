import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: { taskId: number };
    resBody: { newId: number };
  };
}>;
