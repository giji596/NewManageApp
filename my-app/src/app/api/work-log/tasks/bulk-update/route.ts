import { bulkUpdateTask } from "@/lib/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const data = (await req.json()) as {
    id: number;
    progress?: number;
    isFavorite?: boolean;
  }[];
  const res = await bulkUpdateTask(data);
  return NextResponse.json(res);
}
