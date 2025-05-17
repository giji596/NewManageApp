import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";

type Props = {
  /** 稼働時間の初期選択の値 */
  initialHours: number;
};
/**
 * 完了タスクの編集ダイアログのロジック
 */
export const CompletedTaskEditDialogLogic = ({ initialHours }: Props) => {
  // 稼働時間関連
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const onChangeSelectHours = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setDailyHours(Number(target));
  }, []);
  return {
    /** 洗濯中の稼働時間 */
    dailyHours,
    /** 選択した稼働時間に変更するハンドラー */
    onChangeSelectHours,
  };
};
