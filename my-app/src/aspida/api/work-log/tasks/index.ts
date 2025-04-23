import { TaskOption } from "@/type/Task";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: { name: string; categoryId: number; isFavorite: boolean };
    resBody: TaskOption;
  };
}>;
