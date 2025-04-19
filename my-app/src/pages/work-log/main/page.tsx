import { Stack } from "@mui/material";
import NavMenu from "./nav-menu/NavMenu";
import MainPagePieChart from "./pie-chart/MainPagePieChart";
import TaskTable from "./table/TaskTable";

/**
 * メインページ
 */
export default function MainPage() {
  return (
    <Stack direction="row" p={2} justifyContent={"space-between"} height={600}>
      <NavMenu />
      <Stack spacing={2}>
        <MainPagePieChart />
        <TaskTable />
      </Stack>
    </Stack>
  );
}
