import { DUMMY_TASK_ACTIVITY_DATA } from "@/dummy/category-page";
import { subMonths } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

/**
 * 設定した期間のタスク稼働率を円グラフで表示するコンポーネントのロジック
 */
export default function TaskActivityPieChartLogic() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("id") ?? 1);
  // 日付選択のロジック
  const [selectedRange, setSelectedRange] = useState<
    "last-month" | "all" | "select"
  >("last-month");

  const onChangeSelectedRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (["last-month", "all", "select"].includes(newValue)) {
        setSelectedRange(newValue as typeof selectedRange); // if文を通過した場合は型定義として問題ないのでas使う
      }
    },
    []
  );

  // selectedRange:"selected"の場合の日付選択関連
  const [startDate, setStartDate] = useState<Date>(subMonths(new Date(), 1)); // 初期値は一ヶ月前
  const [endDate, setEndDate] = useState<Date>(new Date()); // 初期値は現在の日付

  // 引数はダイアログで設定したstart/endの値
  const handleSetSelectedRange = useCallback((start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  // TODO:データフェッチする(実際はSWR使う予定なのでmemo化は不要) エンドポイントをこんな感じで分岐させる
  const data = useMemo(() => {
    console.log("でーたふぇっち対象:", categoryId);
    if (selectedRange === "select") {
      // TODO:selectedRange=="select"の場合は範囲を使う
      console.log("selectedRange:", selectedRange);
      console.log("でーた範囲:", startDate, "~", endDate);
      return DUMMY_TASK_ACTIVITY_DATA;
    } else {
      console.log("selectedRange:", selectedRange);
      return DUMMY_TASK_ACTIVITY_DATA;
    }
  }, [categoryId, endDate, selectedRange, startDate]);

  return {
    /** 選択中の範囲("last-month" | "all" | "select"のいずれか) */
    selectedRange,
    /** 選択中の範囲を変更する関数 */
    onChangeSelectedRange,
    /** selectedRange:"selected"の場合のデータ取得の開始範囲 */
    startDate,
    /** selectedRange:"selected"の場合のデータ取得の終了範囲 */
    endDate,
    /** 選択した開始・終了の範囲を新たにセットする関数(引数にはダイアログで設定した値を取得する) */
    handleSetSelectedRange,
    /** タスクの稼働データ */
    data,
  };
}
