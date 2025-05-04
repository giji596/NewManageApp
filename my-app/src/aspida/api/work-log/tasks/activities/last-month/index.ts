import { MainPagePieChart } from "@/type/Main";
import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: MainPagePieChart[];
  };
}>;
