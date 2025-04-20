"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import DateDialog from "./dialog/DateDialog";
import DataDialogLogic from "./dialog/DateDialogLogic";
import DailyPageFetchLogic from "./fetchLogic";
import DailyPageNavigationLogic from "./navigationLogic";

/**
 * DailyPage
 */
export default function DailyPage() {
  const {
    itemList,
    isLoadingItemList,
    detailData,
    isLoadingDetail,
    onFetchDetails,
  } = DailyPageFetchLogic();
  const {
    displayYear,
    displayMonth,
    handlePrevMonth,
    handleNextMonth,
    handleChangeYear,
    handleChangeMonth,
    handleNavigateToday,
    handleNavigateSelectedDay,
  } = DailyPageNavigationLogic();
  const { onOpen, ...prevDialogLogic } = DataDialogLogic({
    onFetchData: onFetchDetails,
  });
  return (
    <>
      <Stack spacing={2}>
        <DailyHeader
          displayYear={displayYear}
          displayMonth={displayMonth}
          isLoading={isLoadingItemList}
          handlePrev={handlePrevMonth}
          handleNext={handleNextMonth}
          handleYearChange={handleChangeYear}
          handleMonthChange={handleChangeMonth}
          onClickEditToday={handleNavigateToday}
          onClickEditSelectDate={onOpen}
        />
        <DailyTable
          itemList={itemList}
          onClickRow={handleNavigateSelectedDay}
          isLoading={isLoadingItemList}
        />
      </Stack>
      <DateDialog
        dateDetails={detailData}
        logic={{ onOpen, ...prevDialogLogic }}
        isLoading={isLoadingDetail}
        navigatePage={handleNavigateSelectedDay}
      />
    </>
  );
}
