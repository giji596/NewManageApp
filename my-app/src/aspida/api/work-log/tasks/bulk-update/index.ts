import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  patch: {
    reqBody: {
      id: number;
      progress?: number;
      isFavorite?: boolean;
    }[];
    resBody: { ids: number[] };
  };
}>;
