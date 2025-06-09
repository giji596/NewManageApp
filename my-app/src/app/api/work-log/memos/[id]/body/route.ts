import { getMemoBody } from "@/lib/services/memoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await getMemoBody(id);
  return NextResponse.json(res);
}
