import { createCategory } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name: string };
  const data = await createCategory(body.name);
  return NextResponse.json(data);
}
