import { useCallback, useState } from "react";

const RadioSelectRange = ["in-progress", "completed", "custom"] as const;
type RadioSelectRange = (typeof RadioSelectRange)[number];

/**
 * タスクの表示範囲を設定するダイアログのロジック
 */
export const TaskDisplayRangeDialogLogic = () => {
  const [displayRange, setDisplayRange] =
    useState<RadioSelectRange>("in-progress");
  const handleChangeDisplayRange = useCallback((v: string) => {
    if (RadioSelectRange.includes(v as RadioSelectRange)) {
      setDisplayRange(v as RadioSelectRange);
    }
  }, []);

  return {
    /** 表示範囲(ラジオグループ) */
    displayRange,
    /** 表示範囲を変えるハンドラー(ラジオグループ) */
    handleChangeDisplayRange,
  };
};
