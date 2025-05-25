import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

/**
 * 日付ページヘッダーで使用するメソッド
 */
export default function DailyHeaderLogic() {
  // URL操作
  const router = useRouter();

  // 日付操作
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // ポップオーバーの位置
  const open = Boolean(anchorEl);

  const yearArray = useMemo(
    () => Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i),
    []
  );

  const monthArray = useMemo(() => {
    const isLastYear = Number(displayYear) === yearArray[0];
    if (isLastYear) {
      return Array.from({ length: new Date().getMonth() + 1 }, (_, i) => i + 1);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, [displayYear, yearArray]);

  const isLastRange = useMemo(
    () =>
      Number(displayYear) === new Date().getFullYear() &&
      Number(displayMonth) === new Date().getMonth() + 1,
    [displayMonth, displayYear]
  );
  const isStartRange = useMemo(
    () => Number(displayYear) === yearArray[9] && Number(displayMonth) === 1,
    [displayMonth, displayYear, yearArray]
  );

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // ページ移動
  const handleNavigateToday = useCallback(() => {
    const todayParam = format(new Date(), "yyyy-MM-dd");
    router.push(`/work-log/daily/${todayParam}`);
  }, [router]);
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
    /** 月のstring配列(1~12) */
    monthArray,
    /** 年のstring配列(今年~10年間) */
    yearArray,
    /** 月選択の範囲の最後(今の月)かどうか */
    isLastRange,
    /** 月選択の範囲の最初(10年前の1月)かどうか */
    isStartRange,
    /** ポップオーバーの位置 */
    anchorEl,
    /** ポップオーバーの開閉状態 */
    open,
    /** ポップオーバーを開くハンドラー */
    handleOpenPopover,
    /** ポップオーバーを閉じるハンドラー */
    handleClosePopover,
    /** 今日の詳細ページにナビゲートするハンドラー */
    handleNavigateToday,
  };
}
