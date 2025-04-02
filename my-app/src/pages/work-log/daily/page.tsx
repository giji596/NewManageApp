import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import DateDialog from "./dialog/DateDialog";
import { DUMMY_DAILY_SUMMARY_DATA } from "@/dummy/daily-page";

/**
 * DailyPage
 */
export default function DailyPage() {
  return (
    <>
      <Stack spacing={2}>
        <DailyHeader
          displayYear=""
          displayMonth=""
          isLoading={false}
          handlePrev={() => {}}
          handleNext={() => {}}
          handleYearChange={() => {}}
          handleMonthChange={() => {}}
          onClickEditToday={() => {}}
          onClickEditSelectDate={() => {}}
        />
        <DailyTable itemList={DUMMY_DAILY_SUMMARY_DATA} onClickRow={() => {}} />
      </Stack>
      <DateDialog
        categoryList={[]}
        memoList={[]}
        logic={{
          open: false,
          radioSelect: "一昨日",
          selectYear: 2025,
          selectMonth: 4,
          selectDay: 1,
          selectableYearArray: [],
          selectableMonthArray: [],
          selectableDayArray: [],
          onClose: () => {},
          onOpen: () => {},
          onChangeRadioSelect: () => {},
          onSelectYear: () => {},
          onSelectMonth: () => {},
          onSelectDay: () => {},
        }}
        isLoading={false}
      />
    </>
  );
}
