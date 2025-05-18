import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  delete: {
    resBody: { id: number };
  };
}>;
