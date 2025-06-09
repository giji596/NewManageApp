import { updateCategoryCompleted } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await updateCategoryCompleted(id);
  return NextResponse.json(res);
}
