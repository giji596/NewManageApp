import { localClient } from "@/lib/localClient";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

/**
 * カテゴリのタスク一覧表示コンポーネントのロジック
 */
export default function CategoryTaskListLogic() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("id") ?? 0);
  const noCategory = useMemo(() => categoryId === 0, [categoryId]);
  const { data: fetchData, isLoading } = useSWR(
    noCategory ? null : `api/work-log/categories/${categoryId}/tasks`,
    localClient.work_log.categories._id(categoryId).tasks.get()
  );

  const [selectedValue, setSelectedValue] = useState<
    "in-progress" | "all" | "completed"
  >("in-progress");
  const onChangeSelectedValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (["in-progress", "all", "completed"].includes(newValue)) {
        setSelectedValue(newValue as typeof selectedValue);
      }
    },
    []
  );

  const data = useMemo(() => {
    const rawData = fetchData ?? [];
    switch (selectedValue) {
      case "in-progress":
        return rawData.filter((v) => v.progress !== 100);
      case "completed":
        return rawData.filter((v) => v.progress === 100);
      case "all":
      default:
        return rawData;
    }
  }, [fetchData, selectedValue]);
  return {
    /** タスクテーブル用のデータ */
    data,
    /** データのロード状態 */
    isLoading,
    /** 選択中の値(ヘッダー) */
    selectedValue,
    /** 選択中の値を変更する関数(ヘッダー) */
    onChangeSelectedValue,
  };
}
