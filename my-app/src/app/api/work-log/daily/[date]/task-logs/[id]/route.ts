import {
  deleteTaskLog,
  updateTaskLog,
} from "@/lib/services/dailyDetailService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { taskId, workTime, progress } = (await req.json()) as {
    taskId?: number;
    workTime?: number;
    progress?: number;
  };
  const res = await updateTaskLog(id, taskId, workTime, progress);
  // null時(重複があって更新処理が行われなかった場合)は400コードを返す
  if (res === null)
    return NextResponse.json({ error: "duplicate error" }, { status: 400 });
  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await deleteTaskLog(id);
  return NextResponse.json(res);
}
