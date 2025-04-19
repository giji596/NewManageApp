"use client";
import { Stack } from "@mui/material";
import NavMenu from "./component/nav-menu/NavMenu";
import MainPagePieChart from "./component/pie-chart/MainPagePieChart";
import TaskTable from "./component/table/TaskTable";

/**
 * メインページ
 */
export default function MainPage() {
  return (
    <Stack direction="row" p={2} justifyContent={"space-between"} height={650}>
      <NavMenu />
      <Stack spacing={2}>
        <MainPagePieChart />
        <TaskTable />
      </Stack>
    </Stack>
  );
}
