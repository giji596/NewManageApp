import { deleteMemo, updateMemo } from "@/lib/services/memoService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { text } = (await req.json()) as { text: string };
  const res = await updateMemo(id, text);
  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await deleteMemo(id);
  return NextResponse.json(res);
}
