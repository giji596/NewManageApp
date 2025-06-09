import { getCategoryActivity } from "@/lib/services/categoryService";
import { CategoryActivityRange } from "@/type/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  // クエリ
  const { searchParams } = new URL(req.url);
  // 型安全はaspidaで確保できてるので asで決めつけ
  const range =
    (searchParams.get("range") as CategoryActivityRange) ?? undefined;
  const start = searchParams.get("start") ?? undefined;
  const end = searchParams.get("end") ?? undefined;
  const res = await getCategoryActivity(id, range, start, end);
  return NextResponse.json(res);
}
