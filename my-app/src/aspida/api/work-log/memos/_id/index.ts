import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: {
    reqBody: { text: string };
    resBody: { id: number };
  };
}>;
