import { Stack } from "@mui/material";
import TaskActivityGraph from "./graph/TaskActivityGraph";
import PeriodSelector from "./period-selector/PeriodSelector";
import { DUMMY_TASK_ACTIVITY_DATA } from "@/dummy/category-page";

/**
 * 設定した期間のタスク稼働率を円グラフで表示するコンポーネント
 */
export default function TaskActivityPieChart() {
  return (
    <Stack>
      <PeriodSelector
        selectRange={"last-month"}
        onChangeSelectRange={() => {}}
        startDate={new Date("2025-03-14")}
        endDate={new Date("2025-04-14")}
        getDataSelectRange={() => {}}
      />
      <TaskActivityGraph data={DUMMY_TASK_ACTIVITY_DATA} />
    </Stack>
  );
}
