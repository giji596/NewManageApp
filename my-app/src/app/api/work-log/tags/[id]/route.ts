import { deleteTag, updateTagName } from "@/lib/services/tagService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // リクエストボディ
  const { name } = (await req.json()) as { name: string }; // aspidaで型安全にしてるのでasで宣言
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);

  const res = await updateTagName(name, id);
  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);

  const res = await deleteTag(id);
  return NextResponse.json(res);
}
