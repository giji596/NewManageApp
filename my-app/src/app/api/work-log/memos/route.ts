import { createMemo } from "@/lib/services/memoService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, text, taskLogId, tagId } = (await req.json()) as {
    title: string;
    text: string;
    taskLogId: number;
    tagId?: number;
  };
  const res = await createMemo(title, text, taskLogId, tagId);
  return NextResponse.json(res);
}
