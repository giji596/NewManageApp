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
import { Suspense } from "react";

/**
 * 日付詳細ページ
 */
export default function DailyDetailPage() {
  const { selectedItemId, selectedItemTaskId, handleSelectItem } =
    DailyDetailPageParams();
  return (
    <Suspense>
      <Stack direction="row" spacing={1} pt={3} px={2}>
        {/**　左半分(メニュー/タスク) */}
        <Stack width="50%" justifyContent={"space-between"}>
          {/** メニュー */}
          <DailyDetailMenu />
          {/** タスク */}
          <TaskList
            selectedItemId={selectedItemId}
            handleClickRow={handleSelectItem}
          />
        </Stack>
        {/** 右半分(グラフ/メモ) */}
        <Stack width="50%" justifyContent={"space-between"}>
          {/** グラフ */}
          <CircleGraph />
          {/** メモ */}
          <MemoList selectedItemTaskId={selectedItemTaskId} />
        </Stack>
      </Stack>
    </Suspense>
  );
}
