import { createTag, getMemoTags } from "@/lib/services/memoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await getMemoTags();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { tagName } = (await req.json()) as { tagName: string };
  const res = await createTag(tagName);
  return NextResponse.json(res);
}
