import { Stack } from "@mui/material";
import DailyDetailMenu from "./menu/DailyDetailMenu";
import DailyDetailPageParams from "./param";
import TaskList from "./task-list/TaskList";
import CircleGraph from "./circle-graph/CircleGraph";
import MemoList from "./memo-list/MemoList";
import DailyDetailPageNavLogic from "./navLogic";
/**
 * 日付詳細ページ
 */
export default function DailyDetailPage() {
  const {
    isLoading,
    date,
    dailyHours,
    memoList,
    taskList,
    taskOptions,
    circleDataList,
  } = DailyDetailPageParams();
  const { navigateToCategoryDetail, navigateToTaskDetail } =
    DailyDetailPageNavLogic();
  return (
    <Stack direction="row" height="100%" spacing={1} mx={2} pb={2}>
      {/**　左半分(メニュー/タスク) */}
      <Stack width="50%" spacing={1}>
        {/** メニュー */}
        <Stack height="188px" pt={7} width="85%">
          <DailyDetailMenu
            date={date}
            dailyHours={dailyHours}
            taskList={taskOptions}
          />
        </Stack>
        {/** タスク */}
        <Stack height="390px">
          <TaskList
            taskList={taskList}
            isLoading={isLoading}
            navigateTaskPage={navigateToTaskDetail}
            navigateCategoryPage={navigateToCategoryDetail}
          />
        </Stack>
      </Stack>
      {/** 右半分(グラフ/メモ) */}
      <Stack width="50%" spacing={1}>
        {/** グラフ */}
        <Stack height="300px" alignItems={"center"}>
          <CircleGraph data={circleDataList} />
        </Stack>
        {/** メモ */}
        <Stack height="350px">
          <MemoList memoItemList={memoList} isLoading={isLoading} />
        </Stack>
      </Stack>
    </Stack>
  );
}
