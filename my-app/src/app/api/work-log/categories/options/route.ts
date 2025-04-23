import { getCategoryOptions } from "@/lib/services/categoryService";
import { CategoryOption } from "@/type/Category";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<CategoryOption[]>> {
  const data = await getCategoryOptions();
  if (data.length === 0)
    return NextResponse.json([{ id: 0, name: "カテゴリがありません" }]);
  return NextResponse.json(data);
}
