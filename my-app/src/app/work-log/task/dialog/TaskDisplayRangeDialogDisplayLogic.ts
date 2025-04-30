import { useCallback, useMemo, useState } from "react";
import { RadioSelectRange } from "./TaskDisplayRangeDialogParamLogic";
import { useSearchParams } from "next/navigation";

/**
 * タスクの表示範囲を設定するダイアログの表示状態(disabledなど)のロジック
 */
export const TaskDisplayRangeDialogDisplayLogic = () => {
  // パラメータ
  const param = useSearchParams();
  // disabled関連
  // 初期値
  const initProgressEnable = useMemo(() => !!param.get("progress"), [param]);
  const initStartDateEnable = useMemo(() => !!param.get("startDate"), [param]);
  const initLastDateEnable = useMemo(() => !!param.get("lastDate"), [param]);
  // state
  const [isProgressEnable, setIsProgressEnable] =
    useState<boolean>(initProgressEnable);
  const [isStartDateEnable, setIsStartDateEnable] =
    useState<boolean>(initStartDateEnable);
  const [isLastDateEnable, setIsLastDateEnable] =
    useState<boolean>(initLastDateEnable);
  // ハンドラー
  const toggleProgressEnable = useCallback(() => {
    setIsProgressEnable((prev) => !prev);
  }, []);
  const toggleStartDateEnable = useCallback(() => {
    setIsStartDateEnable((prev) => !prev);
  }, []);
  const toggleLastDateEnable = useCallback(() => {
    setIsLastDateEnable((prev) => !prev);
  }, []);

  const disableCustomRange = useCallback(
    (displayRange: RadioSelectRange) => displayRange !== "custom",
    []
  );
  const disabledProgress = useCallback(
    (displayRange: RadioSelectRange) =>
      disableCustomRange(displayRange) || !isProgressEnable,
    [disableCustomRange, isProgressEnable]
  );
  const disabledStartDate = useCallback(
    (displayRange: RadioSelectRange) =>
      disableCustomRange(displayRange) || !isStartDateEnable,
    [disableCustomRange, isStartDateEnable]
  );
  const disabledLastDate = useCallback(
    (displayRange: RadioSelectRange) =>
      disableCustomRange(displayRange) || !isLastDateEnable,
    [disableCustomRange, isLastDateEnable]
  );
  return {
    /** 進捗の範囲指定の有効かどうか */
    isProgressEnable,
    /** 進捗の範囲指定の有効を切り替える関数 */
    toggleProgressEnable,
    /** 開始日の範囲指定の有効かどうか */
    isStartDateEnable,
    /** 開始日の範囲指定の有効を切り替える関数 */
    toggleStartDateEnable,
    /** 最終日の範囲指定の有効かどうか */
    isLastDateEnable,
    /** 最終日の範囲指定の有効を切り替える関数 */
    toggleLastDateEnable,
    /** メインコンテンツ部分のdisabled */
    disableCustomRange,
    /** 進捗のdisabled */
    disabledProgress,
    /** 開始日のdisabled */
    disabledStartDate,
    /** 最終日のdisabled */
    disabledLastDate,
  };
};
