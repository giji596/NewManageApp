import { deleteCategory } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await deleteCategory(id);
  return NextResponse.json(res);
}
