import apiClient from "@/lib/apiClient";
import { CalendarDateMap } from "@/type/Task";
import useAspidaSWR from "@aspida/swr";
import { getDay, getDaysInMonth, startOfMonth } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

/**月曜を 0 にするために、日曜(0) → 6、月曜(1) → 0...に変換 */
const getMondayStartIndex = (date: Date) => (getDay(date) + 6) % 7;

/** 特定の年月の月曜[0]~日曜[6]となるような週ごとのデータを取得(日付のない部分はnullを返す) */
const generateCalendarWeeks = (year: number, month: number) => {
  // 月初について取得
  const start = startOfMonth(new Date(year, month - 1));
  // 日数を求めてその分の配列を作成
  const daysInMonth = getDaysInMonth(start);
  const dayList = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // 始まりの位置をここで取得(月曜日:0番目~ 日曜日:6番目~)
  const startIndex = getMondayStartIndex(start);
  // 月曜~始まりの位置までの空欄を作成して結合する
  const empty: null[] = Array(startIndex).fill(null);
  const calenderDayList = [...empty, ...dayList];
  // 週ごとに分ける
  const weeks: (number | null)[][] = [];
  while (calenderDayList.length > 0) {
    const week = calenderDayList.splice(0, 7);
    // 最後の週のタイミングでは空欄をnullで埋める
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  return weeks;
};

type Props = {
  /** 表示中の年 */
  year: number;
  /** 表示中の月 */
  month: number;
};

/**
 * 稼働のカレンダーのボディ(日付表示)部分のロジック
 */
export const WorkCalendarBodyLogic = ({ year, month }: Props) => {
  // ページネーション
  const router = useRouter();
  // パラメータ取得
  const { id } = useParams<{ id: string }>();
  // weeksはレンダー時に必ず変化するのでメモ化不要
  const weeks = generateCalendarWeeks(year, month);
  // このkeyはページでの値と同じため、ここでフェッチするのではなくキャッシュされたデータを取得する
  const { data } = useAspidaSWR(apiClient.work_log.tasks._id(id), "get", {
    key: `api/work-log/tasks/${id}`,
    revalidateIfStale: false, // キャッシュ済みの場合にキャッシュデータを利用
  });
  const clickableDays: CalendarDateMap = useMemo(
    () => data?.body.workDateList ?? {},
    [data?.body.workDateList]
  );
  const clickableDaysKey = `${year}-${month}`;

  const isClickable = useCallback(
    (day: number) =>
      clickableDays[clickableDaysKey] && // TODO:念の為配置(本来undefinedにはならないはずだけど テスト環境だとupdatedAtの値がずれたりすることあるので)
      clickableDays[clickableDaysKey].some((d) => d === day),
    [clickableDays, clickableDaysKey]
  );

  const onClickDay = useCallback(
    (day: number) => {
      // "2025-05-22"など 一桁の場合はString.padStartで0を付与する
      const dateParam = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      router.push(`/work-log/daily/${dateParam}`);
    },
    [month, router, year]
  );
  // レイアウト関連
  const boxSize = 40;
  const gap = 6;
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  return {
    /** 週ごとの日付(月~日曜日の7つごとの多重配列) 日付の入らない部分はnull */
    weeks,
    /** クリック可能かの判定 */
    isClickable,
    /** 日付のBoxのサイズ */
    boxSize,
    /** 日付のBox間の距離 */
    gap,
    /** １週間の表示文言の配列 */
    daysOfWeek,
    /** 日付クリック時のハンドラー(その日付に移動) */
    onClickDay,
  };
};
