import { getDailySummaryDetailData } from "@/lib/services/dailyService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // クエリパラメータ取得
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  let date: Date;
  // あればそれをセット
  if (dateParam) {
    date = new Date(dateParam);
    // なければ今日の日付(時間は0にセットする(比較できるように))
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date = today;
  }
  const res = await getDailySummaryDetailData(date);
  return NextResponse.json(res);
}
