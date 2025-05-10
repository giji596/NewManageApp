import { useDateSelect } from "@/hook/useDateSelect";
import { useCallback, useMemo, useState } from "react";

const displayRangeArray = ["last-3-months", "all", "custom"] as const;
export type DisplayRange = (typeof displayRangeArray)[number];

type Props = {
  /** 表示範囲の初期値 */
  initDisplayRange: DisplayRange;
  /** 開始日の初期値 */
  initStartDate: { initYear: number; initMonth: number; initDay: number };
  /** 終了日の初期値 */
  initEndDate: { initYear: number; initMonth: number; initDay: number };
  /** 完了の非表示の初期値 */
  initHideCompleted: boolean;
};

/**
 * 表示するカテゴリの範囲を設定するダイアログロジック
 */
export const CategoryDisplayRangeDialogLogic = ({
  initDisplayRange,
  initStartDate,
  initEndDate,
  initHideCompleted,
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

  // 完了の非表示設定
  const [hideCompleted, setHideCompleted] =
    useState<boolean>(initHideCompleted);
  const onChangeHideCompleted = useCallback(() => {
    setHideCompleted((prev) => !prev);
  }, []);

  const newParam = useMemo(() => {
    // からのクエリ作成
    const result = new URLSearchParams();
    // displayRangeをセット
    result.set("displayRange", displayRange);
    // displayRangeがcustomである場合は日付関連もセット
    if (displayRange === "custom") {
      result.set("startDate", startDateParam);
      result.set("endDate", endDateParam);
    }
    // 完了の非表示設定===trueの場合のみ完了の非表示設定をセット
    if (hideCompleted) result.set("hideCompleted", "true");
    return result.toString();
  }, [displayRange, endDateParam, hideCompleted, startDateParam]);
  return {
    /** ラジオグループの選択範囲 */
    displayRange,
    /** 選択範囲を変えるハンドラー */
    onChangeDisplayRange,
    /** 開始日のロジック */
    startDateLogic,
    /** 終了日のロジック */
    endDateLogic,
    /** 完了の非表示設定 */
    hideCompleted,
    /** 完了の非表示設定を変更するハンドラー */
    onChangeHideCompleted,
    /** 新しいパラメータの値 */
    newParam,
  };
};
