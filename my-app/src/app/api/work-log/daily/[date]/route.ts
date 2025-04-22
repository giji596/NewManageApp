import { getDailyDetailData } from "@/lib/services/dailyDetailService";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { date: string } }) {
  const { date } = params;
  const dateDate = new Date(date);
  const res = await getDailyDetailData(dateDate);
  return NextResponse.json(res);
}
