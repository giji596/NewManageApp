"use client";

import { CircularProgress, Stack } from "@mui/material";
import DailyDetailMenu from "./menu/DailyDetailMenu";
import DailyDetailPageParams from "./param";
import TaskList from "./task-list/TaskList";
const CircleGraph = dynamic(() => import("./circle-graph/CircleGraph"), {
  ssr: false,
  loading: () => (
    <Stack
      width={720}
      height={400}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
    </Stack>
  ),
});
import MemoList from "./memo-list/MemoList";
import dynamic from "next/dynamic";

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
    taskLogSummary,
    circleDataList,
    selectedItemId,
    selectedItemTaskId,
    handleSelectItem,
  } = DailyDetailPageParams();
  return (
    <Stack direction="row" spacing={1} pt={3} px={2}>
      {/**　左半分(メニュー/タスク) */}
      <Stack width="50%" justifyContent={"space-between"}>
        {/** メニュー */}
        <DailyDetailMenu
          date={date}
          dailyHours={dailyHours}
          taskList={taskLogSummary}
        />
        {/** タスク */}
        <TaskList
          taskList={taskList}
          isLoading={isLoading}
          selectedItemId={selectedItemId}
          handleClickRow={handleSelectItem}
        />
      </Stack>
      {/** 右半分(グラフ/メモ) */}
      <Stack width="50%" justifyContent={"space-between"}>
        {/** グラフ */}
        <CircleGraph data={circleDataList} />
        {/** メモ */}
        <MemoList
          memoItemList={memoList}
          selectedItemTaskId={selectedItemTaskId}
          isLoading={isLoading}
        />
      </Stack>
    </Stack>
  );
}
