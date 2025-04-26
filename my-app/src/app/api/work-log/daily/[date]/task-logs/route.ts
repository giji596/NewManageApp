import { createDailyDetailData } from "@/lib/services/dailyDetailService";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { date: string } }
) {
  const { date: dateString } = await params;
  const date = new Date(dateString);
  const { taskId } = (await req.json()) as {
    taskId: number;
  };
  const data = await createDailyDetailData(date, taskId);
  return { newId: data.id };
}
