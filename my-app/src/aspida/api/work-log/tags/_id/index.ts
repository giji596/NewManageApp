import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: { reqBody: { name: string }; resBody: { id: number } };
  delete: {
    resBody: { id: number };
  };
}>;
