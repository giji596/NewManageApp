import { getRecentWorkTime } from "@/lib/services/dailyService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getRecentWorkTime();
  return NextResponse.json(res);
}
