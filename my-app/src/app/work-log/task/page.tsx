"use client";
import { Suspense } from "react";
import TaskSummaryPage from "./TaskSummaryPage";

export default function Page() {
  return (
    <Suspense>
      <TaskSummaryPage />
    </Suspense>
  );
}
