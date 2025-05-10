import { getCategorySummary } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await getCategorySummary(id);
  // null時(データがなかった場合)はエラー(起きないはずではある)
  if (res === null)
    return NextResponse.json(
      {
        error: "No record found with the specified ID.",
      },
      { status: 400 }
    );
  return NextResponse.json(res);
}
