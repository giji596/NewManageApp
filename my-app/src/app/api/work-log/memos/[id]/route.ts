import { deleteMemo, updateMemo } from "@/lib/services/memoService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { title, text, tagId } = (await req.json()) as {
    title?: string;
    text?: string;
    tagId?: number;
  };
  const res = await updateMemo(id, title, text, tagId);
  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await deleteMemo(id);
  return NextResponse.json(res);
}
