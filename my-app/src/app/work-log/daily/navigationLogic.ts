import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * DailyPageのナビゲーション関連のロジック
 */
export default function DailyPageNavigationLogic() {
  const router = useRouter();

  // クエリパラメータ取得
  const searchParams = useSearchParams();
  const todayYear = useMemo(() => new Date().getFullYear(), []);
  const todayMonth = useMemo(() => new Date().getMonth() + 1, []);
  // クエリパラメータから表示(null時は今日の年月を表示)
  const displayYear = searchParams.get("year") ?? String(todayYear);
  const displayMonth = searchParams.get("month") ?? String(todayMonth);

  const handlePrevMonth = useCallback(() => {
    // パラメータのコピー
    const params = new URLSearchParams(searchParams.toString());
    // 新しいmonthの値
    let newMonth: number;
    const currentMonthParam = searchParams.get("month");
    // クエリあるならそれ-1　なければ現在の月-1
    if (currentMonthParam !== null) {
      newMonth = Number(currentMonthParam) - 1;
    } else {
      newMonth = todayMonth - 1;
    }
    // 0になる場合は年を1つ下げてmonthを12にする
    if (newMonth === 0) {
      const newYear = String(Number(displayYear) - 1);
      params.set("year", newYear);
      newMonth = 12;
    }
    params.set("month", String(newMonth));
    router.push(`?${params.toString()}`);
  }, [displayYear, router, searchParams, todayMonth]);
  const handleNextMonth = useCallback(() => {
    // パラメータのコピー
    const params = new URLSearchParams(searchParams.toString());
    // 新しいmonthの値
    let newMonth: number;
    const currentMonthParam = searchParams.get("month");
    // クエリあるならそれ+1　なければ現在の月+1
    if (currentMonthParam !== null) {
      newMonth = Number(currentMonthParam) + 1;
    } else {
      newMonth = todayMonth + 1;
    }
    // 13になる場合は年を1つ上げてmonthを1にする
    if (newMonth === 13) {
      const newYear = String(Number(displayYear) + 1);
      params.set("year", newYear);
      newMonth = 1;
    }
    params.set("month", String(newMonth));
    router.push(`?${params.toString()}`);
  }, [displayYear, router, searchParams, todayMonth]);
  const handleChangeYear = useCallback(
    (v: string) => {
      // パラメータのコピー
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", v);
      // yearの値が今年の場合 -> monthが今月以降である場合monthを今月に修正する
      if (Number(v) === todayYear) {
        if (todayMonth < Number(displayMonth)) {
          params.set("month", String(todayMonth));
        }
      }
      router.push(`?${params.toString()}`);
    },
    [displayMonth, router, searchParams, todayMonth, todayYear]
  );
  const handleChangeMonth = useCallback(
    (v: string) => {
      // パラメータのコピー
      const params = new URLSearchParams(searchParams.toString());
      params.set("month", v);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

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
