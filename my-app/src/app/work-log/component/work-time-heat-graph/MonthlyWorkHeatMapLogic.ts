import { format, getDay, isSameDay, parseISO, subDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type DailyWorkTime = {
  date: string; // '2025-05-11'
  totalHours: number; // 例: 3.25(3時間15分)
};

/** 日付データを週ごとにまとめる関数 */
function groupByWeek(data: DailyWorkTime[]) {
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: (DailyWorkTime | null)[][] = [];
  let currentWeek: (DailyWorkTime | null)[] = new Array(7).fill(null);

  for (const item of sorted) {
    const jsDate = parseISO(item.date);
    const dayOfWeek = getDay(jsDate); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const weekday = (dayOfWeek + 6) % 7; // 0 = Monday, ..., 6 = Sunday

    currentWeek[weekday] = item;

    const isLast = item === sorted[sorted.length - 1];
    const isSunday = weekday === 6;

    if (isSunday || isLast) {
      weeks.push([...currentWeek]);
      currentWeek = new Array(7).fill(null);
    }
  }

  return weeks;
}

/** 直近30日間のログに変換する関数(日付データがない場合は0時間のデータを埋め込む) */
function generateLast30DaysLogs(
  logs: DailyWorkTime[],
  endDate: Date = new Date()
): DailyWorkTime[] {
  const result: DailyWorkTime[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = subDays(endDate, i);
    const dateStr = format(date, "yyyy-MM-dd");

    const existing = logs.find((log) => isSameDay(parseISO(log.date), date));

    result.push({
      date: dateStr,
      totalHours: existing?.totalHours ?? 0,
    });
  }

  return result;
}

/**
 * 1ヶ月間の日毎の稼働時間のヒートグラフのロジック
 */
export const MonthlyWorkHeatMapLogic = () => {
  // レイアウト関連
  const boxSize = 30;
  const gap = 6;
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  /** TODO: 仮データ */
  const data: DailyWorkTime[] = useMemo(
    () => [
      { date: "2025-04-13", totalHours: 8 },
      { date: "2025-04-14", totalHours: 3.5 },
      { date: "2025-04-15", totalHours: 5.5 },
      { date: "2025-04-16", totalHours: 3.5 },
      { date: "2025-04-18", totalHours: 1.5 },
      { date: "2025-04-19", totalHours: 0.75 },
      { date: "2025-04-22", totalHours: 2.5 },
      { date: "2025-04-23", totalHours: 2.5 },
      { date: "2025-05-03", totalHours: 2.25 },
      { date: "2025-05-05", totalHours: 0.5 },
      { date: "2025-05-11", totalHours: 1.5 },
      { date: "2025-05-12", totalHours: 7.5 },
    ],
    []
  );

  const getColorByHours = useCallback((hours: number) => {
    if (hours <= 1) return "#cce5ff";
    if (hours <= 3) return "#66b3ff";
    if (hours <= 6) return "#3399ff";
    return "#0073e6";
  }, []);

  const getDisplayTime = useCallback((hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}時間${m > 0 ? `${m}分` : ""}`;
  }, []);

  // ナビゲーション関連
  const router = useRouter();

  const onClick = useCallback(
    (date: string) => {
      router.push(`work-log/daily/${date}`);
    },
    [router]
  );

  const weeks = useMemo(() => {
    const filled = generateLast30DaysLogs(data);
    return groupByWeek(filled);
  }, [data]);
  return {
    /** グラフの1マスのサイズ */
    boxSize,
    /** グラフのますの間隔 */
    gap,
    /** 月曜から始まる1週間分の曜日の配列["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] */
    daysOfWeek,
    /** 時間に応じたグラフのカラーを取得(稼働時間が多いほど濃くなる)
     * |hours|color|
     * |:---|:---|
     * |0~1|cce5ff|
     * |1.25~3|66b3ff|
     * |3.25~6|3399ff|
     * |6.25~|0073e6|
     */
    getColorByHours,
    /** 時間を整形する関数 */
    getDisplayTime,
    /** クリック時のハンドラー */
    onClick,
    /** 過去1ヶ月間の週ごとに分けられたデータ */
    weeks,
  };
};
