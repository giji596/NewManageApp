import { CategoryLineGraphDisplay } from "@/type/Category";
import { useCallback } from "react";

type Props = {
  /** 表示対象変更時のハンドラー */
  onChangeDisplayTarget: (target: CategoryLineGraphDisplay) => void;
};

/**
 * カテゴリ比較グラフの設定メニューのロジック
 */
export const CategoryLineGraphSettingMenuLogic = ({
  onChangeDisplayTarget,
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
  return {
    /** 表示対象変更時のハンドラー(メモ化済み) */
    handleChangeDisplayTarget,
  };
};
