"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";

/**
 * DailyPage
 */
export default function DailyPage() {
  return (
    <>
      <Stack spacing={2}>
        <DailyHeader />
        <DailyTable />
      </Stack>
    </>
  );
}
