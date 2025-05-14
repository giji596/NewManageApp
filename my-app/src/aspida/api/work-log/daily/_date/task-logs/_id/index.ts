import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: {
    reqBody: { taskId?: number; workTime?: number; progress?: number };
    resBody: { targetId: number };
  };
  delete: {
    resBody: { targetId: number };
  };
}>;
