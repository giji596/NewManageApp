import { getTaskDetail, updateTaskDetail } from "@/lib/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await getTaskDetail(id);
  if (res === null) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }
  return NextResponse.json(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { taskName, categoryId, isFavorite } = (await req.json()) as {
    taskName?: string;
    categoryId?: number;
    isFavorite?: boolean;
  };
  const res = updateTaskDetail(id, taskName, categoryId, isFavorite);
  return NextResponse.json(res);
}
