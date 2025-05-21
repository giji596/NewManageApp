import { CategoryHeaderQuery, CategoryOption } from "@/type/Category";
import { subMonths } from "date-fns";
import { db } from "../dexie";

/**
 * カテゴリ選択賜一覧取得
 */
export const getCategoryOptions = async (
  query?: CategoryHeaderQuery
): Promise<CategoryOption[]> => {
  const hideCompleted = query?.hideCompleted;
  const startDate =
    query?.displayRange === "last-3-months"
      ? subMonths(new Date(), 3)
      : query?.startDate
      ? new Date(query.startDate)
      : undefined;
  const startDateString = startDate?.toISOString().split("T")[0];
  const endDate =
    query?.displayRange === "last-3-months"
      ? new Date()
      : query?.endDate
      ? new Date(query.endDate)
      : undefined;
  const endDateString = endDate?.toISOString().split("T")[0];
  const data = await db.categories.toArray();
  const taskData = await db.tasks.toArray();

  const filteredData = data.filter((category) => {
    if (hideCompleted && category.isCompleted) {
      return false;
    }
    return true;
  });

  const latestData = filteredData.map((v) => {
    const latest = taskData
      .filter((item) => item.categoryId === v.id)
      .reduce(
        (a, b) =>
          b.lastActivityDate
            ? a < b.lastActivityDate
              ? b.lastActivityDate
              : a
            : a,
        "1990-01-01"
      );
    return { id: v.id, name: v.name, latestDate: latest };
  });

  if (!startDateString || !endDateString) {
    const sorted = latestData.sort((a, b) =>
      b.latestDate > a.latestDate ? 1 : -1
    );
    // データがない場合
    if (sorted.length === 0) {
      return [{ id: 0, name: "カテゴリがありません" }];
    }
    return sorted.map((v) => {
      return { id: v.id, name: v.name };
    });
  }

  const filtered = latestData.filter(
    (v) => startDateString <= v.latestDate && v.latestDate <= endDateString
  );
  const sorted = filtered.sort((a, b) =>
    b.latestDate > a.latestDate ? 1 : -1
  );
  // データがない場合
  if (sorted.length === 0) {
    return [{ id: 0, name: "カテゴリがありません" }];
  }

  return sorted.map((v) => {
    return { id: v.id, name: v.name };
  });
};
