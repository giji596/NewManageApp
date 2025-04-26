import { getMemoTags } from "@/lib/services/memoService";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getMemoTags();
  return NextResponse.json(data);
}
