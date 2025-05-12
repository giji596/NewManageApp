import { getMonthlyWorkTime } from "@/lib/services/dailyService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getMonthlyWorkTime();
  return NextResponse.json(res);
}
