import { useCallback } from "react";

/**
 * 日付詳細ページナビゲーション関連のロジック
 */
export default function DailyDetailPageNavLogic() {
  const navigateToTaskDetail = useCallback((id: number) => {
    console.log("タスク詳細へ id:", id);
  }, []);
  const navigateToCategoryDetail = useCallback((id: number) => {
    console.log("カテゴリ詳細へ id:", id);
  }, []);

  return {
    /** タスク詳細ページに飛ぶ */
    navigateToTaskDetail,
    /** カテゴリ詳細ページに飛ぶ */
    navigateToCategoryDetail,
  };
}
