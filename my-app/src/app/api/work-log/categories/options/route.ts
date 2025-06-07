import { getCategoryOptions } from "@/lib/services/categoryService";
import { CategoryPanelQuery, CategoryOption } from "@/type/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<CategoryOption[]>> {
  // クエリ
  const { searchParams } = new URL(req.url);
  // 全てのクエリをオブジェクト化
  const queryObj = Object.fromEntries(
    searchParams.entries()
  ) as CategoryPanelQuery; // aspidaでクエリの型定義は合わせてるのでasで
  const data = await getCategoryOptions(queryObj);
  if (data.length === 0)
    return NextResponse.json([{ id: 0, name: "カテゴリがありません" }]);
  return NextResponse.json(data);
}
