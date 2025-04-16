import { DUMMY_CATEGORY_TASK_LIST } from "@/dummy/category-page";
import { useMemo } from "react";

type Props = {
  /** カテゴリid */
  categoryId: number;
};

/**
 * カテゴリのタスク一覧表示コンポーネントのロジック
 */
export default function CategoryTaskListLogic({ categoryId }: Props) {
  // TODO:カテゴリidを使ってデータふぇっち SWR使うので実際はuseMemoは不要
  const data = useMemo(() => {
    console.log("でーた元のカテゴリid", categoryId);
    return DUMMY_CATEGORY_TASK_LIST;
  }, [categoryId]);
  return {
    /** タスクテーブル用のデータ */
    data,
  };
}
