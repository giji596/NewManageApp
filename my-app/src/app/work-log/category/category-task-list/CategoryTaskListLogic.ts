import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

/**
 * カテゴリのタスク一覧表示コンポーネントのロジック
 */
export default function CategoryTaskListLogic() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("id") ?? 1);
  const { data: fetchData } = useAspidaSWR(
    apiClient.work_log.categories._id(categoryId).tasks,
    "get",
    { key: `api/work-log/categories/${categoryId}/tasks` }
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
    const rawData = fetchData?.body ?? [];
    switch (selectedValue) {
      case "in-progress":
        return rawData.filter((v) => v.progress !== 100);
      case "completed":
        return rawData.filter((v) => v.progress === 100);
      case "all":
      default:
        return rawData;
    }
  }, [fetchData?.body, selectedValue]);
  return {
    /** タスクテーブル用のデータ */
    data,
    /** 選択中の値(ヘッダー) */
    selectedValue,
    /** 選択中の値を変更する関数(ヘッダー) */
    onChangeSelectedValue,
  };
}
