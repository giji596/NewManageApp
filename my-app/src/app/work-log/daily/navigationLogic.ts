import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * DailyPageのナビゲーション関連のロジック
 */
export default function DailyPageNavigationLogic() {
  const router = useRouter();

  const handleNavigateToday = useCallback(() => {
    const todayParam = format(new Date(), "yyyy-MM-dd");
    router.push(`/work-log/daily/${todayParam}`);
  }, [router]);
  const handleNavigateSelectedDay = useCallback(
    (dateParam: string) => {
      router.push(`/work-log/daily/${dateParam}`);
    },
    [router]
  );
  return {
    /** 今日の詳細ページにナビゲートするハンドラー */
    handleNavigateToday,
    /** 指定された詳細ページにナビゲートするハンドラー */
    handleNavigateSelectedDay,
  };
}
