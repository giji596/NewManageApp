import { getLastMonthTaskActivities } from "@/lib/services/taskService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getLastMonthTaskActivities();
  return NextResponse.json(res);
}
