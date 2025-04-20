"use client";
import { Stack } from "@mui/material";
import NavMenu from "./component/nav-menu/NavMenu";
const MainPagePieChart = dynamic(
  () => import("./component/pie-chart/MainPagePieChart"),
  { ssr: false }
);
import TaskTable from "./component/table/TaskTable";
import dynamic from "next/dynamic";

/**
 * メインページ
 */
export default function MainPage() {
  return (
    <Stack direction="row" px={8} py={2} spacing={10} height={650}>
      <NavMenu />
      <Stack spacing={2}>
        <MainPagePieChart />
        <TaskTable />
      </Stack>
    </Stack>
  );
}
