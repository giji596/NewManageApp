import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * カテゴリページのタスク一覧のテーブルのロジック
 */
export default function CategoryTaskTableLogic() {
  const router = useRouter();

  const navigateToTaskDetail = useCallback(
    (id: number) => {
      router.push(`/work-log/task/${id}`);
    },
    [router]
  );

  return {
    /** タスク詳細ページへ移動する関数 */
    navigateToTaskDetail,
  };
}
