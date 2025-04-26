import { updateTaskLog } from "@/lib/services/dailyDetailService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { taskId, workTime } = (await req.json()) as {
    taskId?: number;
    workTime?: number;
  };
  const res = await updateTaskLog(id, taskId, workTime);
  return NextResponse.json(res);
}
