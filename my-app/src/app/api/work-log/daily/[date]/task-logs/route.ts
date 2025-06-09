import { createDailyDetailData } from "@/lib/services/dailyDetailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date: dateString } = await params;
  const date = new Date(dateString);
  const { taskId } = (await req.json()) as {
    taskId: number;
  };
  const data = await createDailyDetailData(date, taskId);
  if (data === null)
    return NextResponse.json({ error: "duplicate error" }, { status: 400 });
  return NextResponse.json({ newId: data.id });
}
