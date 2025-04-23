import { createCategory } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name: string };
  const data = await createCategory(body.name);
  // null時(重複時) エラーを返す
  if (data === null)
    return NextResponse.json({ error: "duplicate error" }, { status: 400 });
  // 正常時
  return NextResponse.json(data);
}
