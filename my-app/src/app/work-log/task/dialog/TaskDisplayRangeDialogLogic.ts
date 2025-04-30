import { useCallback, useState } from "react";

const RadioSelectRange = ["in-progress", "completed", "custom"] as const;
type RadioSelectRange = (typeof RadioSelectRange)[number];

/**
 * タスクの表示範囲を設定するダイアログのロジック
 */
export const TaskDisplayRangeDialogLogic = () => {
  // 表示範囲
  const [displayRange, setDisplayRange] =
    useState<RadioSelectRange>("in-progress");
  const handleChangeDisplayRange = useCallback((v: string) => {
    if (RadioSelectRange.includes(v as RadioSelectRange)) {
      setDisplayRange(v as RadioSelectRange);
    }
  }, []);

  // 進捗
  const [progressRange, setProgressRange] = useState<number[]>([0, 90]);
  const handleChangeProgressRange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === "object") {
        setProgressRange(newValue);
      }
    },
    []
  );
  return {
    /** 表示範囲(ラジオグループ) */
    displayRange,
    /** 表示範囲を変えるハンドラー(ラジオグループ) */
    handleChangeDisplayRange,
    /** 進捗の範囲 */
    progressRange,
    /** 進捗の範囲を変えるハンドラー */
    handleChangeProgressRange,
  };
};
