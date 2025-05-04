import { getLastMonthTaskProgress } from "@/lib/services/taskService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getLastMonthTaskProgress();
  return NextResponse.json(res);
}
