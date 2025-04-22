import { getDailyDetailData } from "@/lib/services/dailyDetailService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { date: string } }
) {
  const { date } = params;
  const dateDate = new Date(date);
  const res = await getDailyDetailData(dateDate);
  return NextResponse.json(res);
}
