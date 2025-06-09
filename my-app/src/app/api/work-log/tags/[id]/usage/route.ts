import { getTagUsageMemoTitlesAndCount } from "@/lib/services/tagService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);

  const res = await getTagUsageMemoTitlesAndCount(id);
  return NextResponse.json(res);
}
