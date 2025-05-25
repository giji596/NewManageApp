"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import DailyPageFetchLogic from "./fetchLogic";
import DailyPageNavigationLogic from "./navigationLogic";

/**
 * DailyPage
 */
export default function DailyPage() {
  const { itemList, isLoadingItemList } = DailyPageFetchLogic();
  const { handleNavigateSelectedDay } = DailyPageNavigationLogic();

  return (
    <>
      <Stack spacing={2}>
        <DailyHeader />
        <DailyTable
          itemList={itemList}
          onClickRow={handleNavigateSelectedDay}
          isLoading={isLoadingItemList}
        />
      </Stack>
    </>
  );
}
