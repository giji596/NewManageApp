import { Prisma } from "@/generated/prisma";
import { deleteCategory } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // パラメータ
  const { id: idParam } = await params;
  const id = Number(idParam);
  try {
    const res = await deleteCategory(id);
    return NextResponse.json(res);
    // エラー時 想定したエラー(利用先のログがある場合)であれば400で返す
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // エラーコード: P2003 参照先のkeyがある場合は削除できない
      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "Cannot delete task due to foreign key constraint" },
          { status: 400 }
        );
      }
    }
    // 他のエラー（予期しないエラー）
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
