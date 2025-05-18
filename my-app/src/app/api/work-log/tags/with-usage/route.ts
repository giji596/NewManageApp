import { getTagWithUsage } from "@/lib/services/tagService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getTagWithUsage();
  return NextResponse.json(res);
}
