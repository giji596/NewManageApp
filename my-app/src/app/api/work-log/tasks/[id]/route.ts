import { getTaskDetail } from "@/lib/services/taskService";
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
