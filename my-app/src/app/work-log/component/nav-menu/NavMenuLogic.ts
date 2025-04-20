import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * メインページのナビゲーションメニューのロジック
 */
export default function NavMenuLogic() {
  const router = useRouter();
  const navButtonStyle = useMemo(() => {
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 1,
      color: "primary.main",
      bgcolor: "white",
      border: "1px solid #ddd",
      borderRadius: 2,
      boxShadow: 1,
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "primary.light",
        color: "white",
        transform: "translateY(-2px)",
      },
    };
  }, []);

  // TODO:ページ関連実装時にそれぞれ実装
  const navigateToday = useCallback(() => {
    console.log("今日のページへ");
  }, []);
  const navigateYesterday = useCallback(() => {
    console.log("昨日のページへ");
  }, []);
  const navigateDaily = useCallback(() => {
    router.push("/work-log/daily");
  }, [router]);
  const navigateTask = useCallback(() => {
    router.push("/work-log/task");
  }, [router]);
  const navigateCategory = useCallback(() => {
    router.push("/work-log/category");
  }, [router]);
  return {
    /** ボタンの共通style */
    navButtonStyle,
    /** 今日へ移動するハンドラー */
    navigateToday,
    /** 機能へ移動するハンドラー */
    navigateYesterday,
    /** 日付一覧ページへ移動するハンドラー */
    navigateDaily,
    /** タスク一覧ページへ移動するハンドラー */
    navigateTask,
    /** カテゴリ一覧ページへ移動するハンドラー */
    navigateCategory,
  };
}
