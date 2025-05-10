import { useDateSelect } from "@/hook/useDateSelect";
import { useCallback, useState } from "react";

const displayRangeArray = ["last-3-months", "all", "custom"] as const;
export type DisplayRange = (typeof displayRangeArray)[number];

type Props = {
  /** 表示範囲の初期値 */
  initDisplayRange: DisplayRange;
  /** 開始日の初期値 */
  initStartDate: { initYear: number; initMonth: number; initDay: number };
  /** 終了日の初期値 */
  initEndDate: { initYear: number; initMonth: number; initDay: number };
};

/**
 * 表示するカテゴリの範囲を設定するダイアログロジック
 */
export const CategoryDisplayRangeDialogLogic = ({
  initDisplayRange,
  initStartDate,
  initEndDate,
}: Props) => {
  // ラジオグループ　表示範囲関連
  const [displayRange, setDisplayRange] =
    useState<DisplayRange>(initDisplayRange);

  const onChangeDisplayRange = useCallback((v: string) => {
    if (displayRangeArray.includes(v as DisplayRange)) {
      setDisplayRange(v as DisplayRange);
    }
  }, []);

  // 日付選択
  const { dateParam: startDateParam, ...startDateLogic } =
    useDateSelect(initStartDate);
  const { dateParam: endDateParam, ...endDateLogic } =
    useDateSelect(initEndDate);

  return {
    /** ラジオグループの選択範囲 */
    displayRange,
    /** 選択範囲を変えるハンドラー */
    onChangeDisplayRange,
    /** 開始日のロジック */
    startDateLogic,
    /** 終了日のロジック */
    endDateLogic,
  };
};
