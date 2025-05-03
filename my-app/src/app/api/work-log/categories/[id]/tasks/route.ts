import { getCategoryTasks } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await getCategoryTasks(id);
  return NextResponse.json(res);
}
