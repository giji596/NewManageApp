import { createTask, getTaskSummary } from "@/lib/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await getTaskSummary();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name, categoryId, isFavorite } = (await req.json()) as {
    name: string;
    categoryId: number;
    isFavorite: boolean;
  };
  const data = await createTask(name, categoryId, isFavorite);
  // 重複時
  if (data === null)
    return NextResponse.json({ error: "duplicate error" }, { status: 400 });
  // 正常時
  return NextResponse.json(data);
}
