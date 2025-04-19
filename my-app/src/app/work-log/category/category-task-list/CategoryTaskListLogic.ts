import { DUMMY_CATEGORY_TASK_LIST } from "@/dummy/category-page";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** カテゴリid */
  categoryId: number;
};

/**
 * カテゴリのタスク一覧表示コンポーネントのロジック
 */
export default function CategoryTaskListLogic({ categoryId }: Props) {
  // TODO:カテゴリidを使ってデータふぇっち SWR使うので実際はuseMemoは不要
  const rowData = useMemo(() => {
    console.log("でーた元のカテゴリid", categoryId);
    return DUMMY_CATEGORY_TASK_LIST;
  }, [categoryId]);

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
    switch (selectedValue) {
      case "in-progress":
        return rowData.filter((v) => v.progress !== 100);
      case "completed":
        return rowData.filter((v) => v.progress === 100);
      case "all":
      default:
        return rowData;
    }
  }, [rowData, selectedValue]);
  return {
    /** タスクテーブル用のデータ */
    data,
    /** 選択中の値(ヘッダー) */
    selectedValue,
    /** 選択中の値を変更する関数(ヘッダー) */
    onChangeSelectedValue,
  };
}
