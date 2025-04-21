import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * 日付詳細ページナビゲーション関連のロジック
 */
export default function DailyDetailPageNavLogic() {
  const router = useRouter();
  const navigateToTaskDetail = useCallback(
    (id: number) => {
      router.push(`/work-log/task/${id}`);
    },
    [router]
  );
  const navigateToCategoryDetail = useCallback(
    (id: number) => {
      router.push(`/work-log/category/?id=${id}`);
    },
    [router]
  );

  return {
    /** タスク詳細ページに飛ぶ */
    navigateToTaskDetail,
    /** カテゴリ詳細ページに飛ぶ */
    navigateToCategoryDetail,
  };
}
