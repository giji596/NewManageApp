"use client";

import { CircularProgress, Stack } from "@mui/material";
import DailyDetailMenu from "./menu/DailyDetailMenu";
import DailyDetailPageParams from "./param";
import TaskList from "./task-list/TaskList";
const CircleGraph = dynamic(() => import("./circle-graph/CircleGraph"), {
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
});
import MemoList from "./memo-list/MemoList";
import DailyDetailPageNavLogic from "./navLogic";
import dynamic from "next/dynamic";
import { use } from "react";

type Props = {
  /** パスパラメータ(ページ呼び出し時に自動的に取得) */
  params: Promise<{ date: string }>;
};
/**
 * 日付詳細ページ
 */
export default function DailyDetailPage({ params }: Props) {
  const { date: dateParam } = use(params);
  const {
    isLoading,
    date,
    dailyHours,
    memoList,
    taskList,
    taskOptions,
    circleDataList,
  } = DailyDetailPageParams({ dateParam });
  const { navigateToCategoryDetail, navigateToTaskDetail } =
    DailyDetailPageNavLogic();
  return (
    <Stack direction="row" spacing={1} pt={3} px={2}>
      {/**　左半分(メニュー/タスク) */}
      <Stack width="50%" justifyContent={"space-between"}>
        {/** メニュー */}
        <DailyDetailMenu
          date={date}
          dailyHours={dailyHours}
          taskList={taskOptions}
        />
        {/** タスク */}
        <TaskList
          taskList={taskList}
          isLoading={isLoading}
          navigateTaskPage={navigateToTaskDetail}
          navigateCategoryPage={navigateToCategoryDetail}
        />
      </Stack>
      {/** 右半分(グラフ/メモ) */}
      <Stack width="50%" justifyContent={"space-between"}>
        {/** グラフ */}
        <CircleGraph data={circleDataList} />
        {/** メモ */}
        <MemoList memoItemList={memoList} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
}
