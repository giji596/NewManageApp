import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: {
    reqBody: { taskId?: number; workTime?: number };
    resBody: { targetId: number };
  };
  delete: {
    resBody: { targetId: number };
  };
}>;
