import { useCallback, useMemo, useState } from "react";

type Props = {
  /** 開始日 */
  startDate: string;
  /** 最終実施日 */
  lastDate: string;
};

/**
 *  稼働のカレンダーのロジック
 */
export const WorkCalendarLogic = ({ startDate, lastDate }: Props) => {
  const startYearAndMonth = useMemo(() => {
    const [y, m] = startDate.split("/");
    return { year: Number(y), month: Number(m) };
  }, [startDate]);
  const lastYearAndMonth = useMemo(() => {
    const [y, m] = lastDate.split("/");
    return { year: Number(y), month: Number(m) };
  }, [lastDate]);

  const initYear = lastYearAndMonth.year;
  const initMonth = lastYearAndMonth.month;

  const [year, setYear] = useState<number>(initYear);
  const [month, setMonth] = useState<number>(initMonth);

  const handlePrevMonth = useCallback(() => {
    setMonth((prev) => {
      // 1月の場合は年を一つ下げて12月にする
      if (prev === 1) {
        setYear((prev) => prev - 1);
        return 12;
      }
      // それ以外は月を一つ下げる
      return prev - 1;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setMonth((prev) => {
      // 12月の場合は年を一つ進めて1月にする
      if (prev === 12) {
        setYear((prevYear) => prevYear - 1);
        return 1;
      }
      // それ位がは月を一つ進める
      return prev + 1;
    });
  }, []);

  const isMinMonth = useMemo(
    () => year === startYearAndMonth.year && month === startYearAndMonth.month,
    [month, startYearAndMonth.month, startYearAndMonth.year, year]
  );
  const isMaxMonth = useMemo(
    () => year === lastYearAndMonth.year && month === lastYearAndMonth.month,
    [month, lastYearAndMonth.month, lastYearAndMonth.year, year]
  );

  return {
    /** 表示中の年 */
    year,
    /** 表示中の月 */
    month,
    /** 一月前に戻るハンドラー */
    handlePrevMonth,
    /** 一月後に進むハンドラー */
    handleNextMonth,
    /** 最も過去の月に到達しているか（戻るボタンの無効化用） */
    isMinMonth,
    /** 最も未来の月に到達しているか（進むボタンの無効化用） */
    isMaxMonth,
  };
};
