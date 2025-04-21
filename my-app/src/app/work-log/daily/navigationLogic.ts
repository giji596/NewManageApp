import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * DailyPageのナビゲーション関連のロジック
 */
export default function DailyPageNavigationLogic() {
  const router = useRouter();

  const searchParams = useSearchParams(); // クエリパラメータ取得
  const todayYear = useMemo(() => new Date().getFullYear(), []);
  const todayMonth = useMemo(() => new Date().getMonth() + 1, []);
  const displayYear = searchParams.get("year") ?? String(todayYear);
  const displayMonth = searchParams.get("month") ?? String(todayMonth);

  // TODO:クエリパラメータを変更させる
  const handlePrevMonth = useCallback(() => {
    // パラメータのコピー
    const params = new URLSearchParams(searchParams.toString());
    // 新しいmonthの値(クエリあるならそれ-1　なければ現在の月-1)
    let newMonth: number;
    const currentMonthParam = searchParams.get("month");
    if (currentMonthParam !== null) {
      newMonth = Number(searchParams.get("month")) - 1;
    } else {
      newMonth = todayMonth - 1;
    }
    params.set("month", String(newMonth));
    router.push(`?${params.toString()}`);
  }, [router, searchParams, todayMonth]);
  const handleNextMonth = useCallback(() => {
    // パラメータのコピー
    const params = new URLSearchParams(searchParams.toString());
    // 新しいmonthの値(クエリあるならそれ+1　なければ現在の月+1)
    let newMonth: number;
    const currentMonthParam = searchParams.get("month");
    if (currentMonthParam !== null) {
      newMonth = Number(searchParams.get("month")) + 1;
    } else {
      newMonth = todayMonth + 1;
    }
    params.set("month", String(newMonth));
    router.push(`?${params.toString()}`);
  }, [router, searchParams, todayMonth]);
  const handleChangeYear = useCallback((v: string) => {
    console.log("飛び先年:", v);
  }, []);
  const handleChangeMonth = useCallback((v: string) => {
    console.log("飛び先月:", v);
  }, []);

  // TODO:ページの移動を行う
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
    /** 表示されている年 */
    displayYear,
    /** 表示されている月 */
    displayMonth,
    /** 前の月にナビゲートするハンドラー */
    handlePrevMonth,
    /** 次の月にナビゲートするハンドラー */
    handleNextMonth,
    /** 指定した年にナビゲートするハンドラー */
    handleChangeYear,
    /** 指定した月にナビゲートするハンドラー */
    handleChangeMonth,
    /** 今日の詳細ページにナビゲートするハンドラー */
    handleNavigateToday,
    /** 指定された詳細ページにナビゲートするハンドラー */
    handleNavigateSelectedDay,
  };
}
