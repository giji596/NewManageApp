import { Stack } from "@mui/material";
import NavMenu from "./nav-menu/NavMenu";
import MainPagePieChart from "./pie-chart/MainPagePieChart";
import TaskTable from "./table/TaskTable";

/**
 * メインページ
 */
export default function MainPage() {
  return (
    <Stack direction="row">
      <NavMenu />
      <Stack>
        <MainPagePieChart />
        <TaskTable />
      </Stack>
    </Stack>
  );
}
