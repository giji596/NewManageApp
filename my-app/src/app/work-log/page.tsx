"use client";
import { CircularProgress, Stack } from "@mui/material";
import NavMenu from "./component/nav-menu/NavMenu";
const MainPagePieChart = dynamic(
  () => import("./component/pie-chart/MainPagePieChart"),
  {
    ssr: false,
    loading: () => (
      <Stack
        width={600}
        height={400}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
      </Stack>
    ),
  }
);
import TaskTable from "./component/table/TaskTable";
import dynamic from "next/dynamic";
import RecentWorkHeatMap from "./component/work-time-heat-graph/MonthlyWorkHeatMap";

/**
 * メインページ
 */
export default function MainPage() {
  return (
    <Stack direction="row" px={8} pt={6} spacing={15} height={650}>
      <NavMenu />
      <Stack spacing={2}>
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <RecentWorkHeatMap />
          <MainPagePieChart />
        </Stack>
        <TaskTable />
      </Stack>
    </Stack>
  );
}
