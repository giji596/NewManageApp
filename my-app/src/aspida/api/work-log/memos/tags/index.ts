import { MemoTag } from "@/generated/prisma";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: { resBody: MemoTag[] };
  post: { reqBody: { tagName: string }; resBody: { id: number } };
}>;
