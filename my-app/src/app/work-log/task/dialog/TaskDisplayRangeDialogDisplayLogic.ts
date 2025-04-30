import { useCallback, useMemo, useState } from "react";
import { RadioSelectRange } from "./TaskDisplayRangeDialogParamLogic";

type Props = {
  /** 表示範囲を表す文言 */
  displayRange: RadioSelectRange;
};

/**
 * タスクの表示範囲を設定するダイアログの表示状態(disabledなど)のロジック
 */
export const TaskDisplayRangeDialogDisplayLogic = ({ displayRange }: Props) => {
  // disabled関連
  const [isProgressEnable, setIsProgressEnable] = useState<boolean>(false);
  const [isStartDateEnable, setIsStartDateEnable] = useState<boolean>(false);
  const [isLastDateEnable, setIsLastDateEnable] = useState<boolean>(false);
  const toggleProgressEnable = useCallback(() => {
    setIsProgressEnable((prev) => !prev);
  }, []);
  const toggleStartDateEnable = useCallback(() => {
    setIsStartDateEnable((prev) => !prev);
  }, []);
  const toggleLastDateEnable = useCallback(() => {
    setIsLastDateEnable((prev) => !prev);
  }, []);

  const disableCustomRange = useMemo(
    () => displayRange !== "custom",
    [displayRange]
  );
  const disabledProgress = useMemo(
    () => disableCustomRange || !isProgressEnable,
    [disableCustomRange, isProgressEnable]
  );
  const disabledStartDate = useMemo(
    () => disableCustomRange || !isStartDateEnable,
    [disableCustomRange, isStartDateEnable]
  );
  const disabledLastDate = useMemo(
    () => disableCustomRange || !isLastDateEnable,
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
