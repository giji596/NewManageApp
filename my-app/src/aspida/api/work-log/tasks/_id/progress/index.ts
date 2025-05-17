import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: { progress: number };
  };
}>;
