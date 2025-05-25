"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import DateDialog from "./dialog/DateDialog";
import DailyPageFetchLogic from "./fetchLogic";
import DailyPageNavigationLogic from "./navigationLogic";
import useDialog from "@/hook/useDialog";

/**
 * DailyPage
 */
export default function DailyPage() {
  const { itemList, isLoadingItemList } = DailyPageFetchLogic();
  const { handleNavigateSelectedDay } = DailyPageNavigationLogic();
  const { open, onClose, onOpen } = useDialog();
  return (
    <>
      <Stack spacing={2}>
        <DailyHeader
          isLoading={isLoadingItemList}
          onClickEditSelectDate={onOpen}
        />
        <DailyTable
          itemList={itemList}
          onClickRow={handleNavigateSelectedDay}
          isLoading={isLoadingItemList}
        />
      </Stack>
      {open && (
        <DateDialog
          open={open}
          onClose={onClose}
          navigatePage={handleNavigateSelectedDay}
        />
      )}
    </>
  );
}
