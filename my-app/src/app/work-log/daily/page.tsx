"use client";

import { Stack } from "@mui/material";
import DailyHeader from "./header/DailyHeader";
import DailyTable from "./table/DailyTable";
import { Suspense } from "react";

/**
 * DailyPage
 */
export default function DailyPage() {
  return (
    <Suspense>
      <Stack spacing={2}>
        <DailyHeader />
        <DailyTable />
      </Stack>
    </Suspense>
  );
}
