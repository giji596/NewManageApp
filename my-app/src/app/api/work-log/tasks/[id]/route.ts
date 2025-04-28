import { Prisma } from "@/generated/prisma";
import {
  deleteTask,
  getTaskDetail,
  updateTaskDetail,
} from "@/lib/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const res = await getTaskDetail(id);
  if (res === null) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }
  return NextResponse.json(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { taskName, categoryId, isFavorite, progress } = (await req.json()) as {
    taskName?: string;
    categoryId?: number;
    isFavorite?: boolean;
    progress?: number;
  };
  const res = updateTaskDetail(id, taskName, categoryId, isFavorite, progress);
  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  try {
    const res = await deleteTask(id);
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
