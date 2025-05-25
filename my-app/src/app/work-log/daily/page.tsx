"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import DailyPageNavigationLogic from "./navigationLogic";

/**
 * DailyPage
 */
export default function DailyPage() {
  const { handleNavigateSelectedDay } = DailyPageNavigationLogic();

  return (
    <>
      <Stack spacing={2}>
        <DailyHeader />
        <DailyTable onClickRow={handleNavigateSelectedDay} />
      </Stack>
    </>
  );
}
