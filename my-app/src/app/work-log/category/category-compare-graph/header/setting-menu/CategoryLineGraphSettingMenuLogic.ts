import { CategoryLineGraphDisplay } from "@/type/Category";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";

type Props = {
  /** 表示対象変更時のハンドラー */
  onChangeDisplayTarget: (target: CategoryLineGraphDisplay) => void;
  /** 表示範囲の開始日 */
  startDate: Date;
  /** 表示範囲の終了日 */
  endDate: Date;
};

/**
 * カテゴリ比較グラフの設定メニューのロジック
 */
export const CategoryLineGraphSettingMenuLogic = ({
  onChangeDisplayTarget,
  startDate,
  endDate,
}: Props) => {
  const handleChangeDisplayTarget = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
      const displays = ["totalHours", "taskCount"];
      // 型定義ないの値かどうかチェックして範囲内ならセットする
      if (displays.includes(value))
        onChangeDisplayTarget(value as CategoryLineGraphDisplay);
    },
    [onChangeDisplayTarget]
  );

  const startDateString = useMemo(
    () => format(startDate, "yyyy/MM/dd"),
    [startDate]
  );
  const endDateString = useMemo(() => format(endDate, "yyyy/MM/dd"), [endDate]);
  return {
    /** 表示対象変更時のハンドラー(メモ化済み) */
    handleChangeDisplayTarget,
    /** 開始日のstring */
    startDateString,
    /** 終了日のstring */
    endDateString,
  };
};
