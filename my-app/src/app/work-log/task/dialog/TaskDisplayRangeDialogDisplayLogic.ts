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
  const initFirstActivityDateEnable = useMemo(
    () => !!param.get("firstActivityDate"),
    [param]
  );
  const initLastDateEnable = useMemo(
    () => !!param.get("lastActivityDate"),
    [param]
  );
  // state
  const [isProgressEnable, setIsProgressEnable] =
    useState<boolean>(initProgressEnable);
  const [isFirstActivityDateEnable, setIsFirstActivityDateEnable] =
    useState<boolean>(initFirstActivityDateEnable);
  const [isLastActivityDateEnable, setIsLastActivityDateEnable] =
    useState<boolean>(initLastDateEnable);
  // ハンドラー
  const toggleProgressEnable = useCallback(() => {
    setIsProgressEnable((prev) => !prev);
  }, []);
  const toggleFirstActivityDateEnable = useCallback(() => {
    setIsFirstActivityDateEnable((prev) => !prev);
  }, []);
  const toggleLastActivityDateEnable = useCallback(() => {
    setIsLastActivityDateEnable((prev) => !prev);
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
  const disabledFirstActivityDate = useCallback(
    (displayRange: RadioSelectRange) =>
      disableCustomRange(displayRange) || !isFirstActivityDateEnable,
    [disableCustomRange, isFirstActivityDateEnable]
  );
  const disabledLastActivityDate = useCallback(
    (displayRange: RadioSelectRange) =>
      disableCustomRange(displayRange) || !isLastActivityDateEnable,
    [disableCustomRange, isLastActivityDateEnable]
  );
  return {
    /** 進捗の範囲指定の有効かどうか */
    isProgressEnable,
    /** 進捗の範囲指定の有効を切り替える関数 */
    toggleProgressEnable,
    /** 開始日の範囲指定の有効かどうか */
    isFirstActivityDateEnable,
    /** 開始日の範囲指定の有効を切り替える関数 */
    toggleFirstActivityDateEnable,
    /** 最終実施日の範囲指定の有効かどうか */
    isLastActivityDateEnable,
    /** 最終実施日の範囲指定の有効を切り替える関数 */
    toggleLastActivityDateEnable,
    /** メインコンテンツ部分のdisabled */
    disableCustomRange,
    /** 進捗のdisabled */
    disabledProgress,
    /** 開始日のdisabled */
    disabledFirstActivityDate,
    /** 最終実施日のdisabled */
    disabledLastActivityDate,
  };
};
