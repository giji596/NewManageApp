import { createTask, getTaskSummary } from "@/lib/services/taskService";
import { TaskSummaryRangeQuery } from "@/type/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: TaskSummaryRangeQuery = {
    progress: searchParams.get("progress") ?? undefined,
    createdAt: searchParams.get("startDate") ?? undefined,
    lastActivityDate: searchParams.get("lastDate") ?? undefined,
    activeOnly: searchParams.get("activeOnly") ?? undefined,
  };
  const data = await getTaskSummary(query);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name, categoryId, isFavorite, startDate } = (await req.json()) as {
    name: string;
    categoryId: number;
    isFavorite: boolean;
    startDate: string;
  };
  const createdAt = new Date(startDate);
  const data = await createTask(name, categoryId, isFavorite, createdAt);
  // 重複時
  if (data === null)
    return NextResponse.json({ error: "duplicate error" }, { status: 400 });
  // 正常時
  return NextResponse.json(data);
}
