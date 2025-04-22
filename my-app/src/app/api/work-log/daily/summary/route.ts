import { getDailySummaryData } from "@/lib/services/dailyService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // クエリパラメータ(またはなければ今の年月)を取得
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get("year")) ?? nowYear;
  const month = Number(searchParams.get("month")) ?? nowMonth;
  // データを取得して返す
  const res = await getDailySummaryData(year, month);
  return NextResponse.json(res);
}
