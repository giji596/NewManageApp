import { getTaskOptions } from "@/lib/services/taskService";
import { TaskOption } from "@/type/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<TaskOption[]>> {
  const { searchParams } = new URL(req.url);
  const categoryId = Number(searchParams.get("categoryId") ?? "0");
  const data = await getTaskOptions(categoryId);
  if (data.length === 0)
    return NextResponse.json([{ id: 0, name: "タスクがありません" }]);
  return NextResponse.json(data);
}
