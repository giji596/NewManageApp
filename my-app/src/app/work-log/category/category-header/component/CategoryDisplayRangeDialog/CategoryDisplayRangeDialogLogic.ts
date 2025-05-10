import { useCallback, useState } from "react";

const displayRangeArray = ["last-3-months", "all", "custom"] as const;
export type DisplayRange = (typeof displayRangeArray)[number];

type Props = {
  /** 表示範囲の初期値 */
  initDisplayRange: DisplayRange;
};

/**
 * 表示するカテゴリの範囲を設定するダイアログロジック
 */
export const CategoryDisplayRangeDialogLogic = ({
  initDisplayRange,
}: Props) => {
  const [displayRange, setDisplayRange] =
    useState<DisplayRange>(initDisplayRange);

  const onChangeDisplayRange = useCallback((v: string) => {
    if (displayRangeArray.includes(v as DisplayRange)) {
      setDisplayRange(v as DisplayRange);
    }
  }, []);

  return {
    /** ラジオグループの選択範囲 */
    displayRange,
    /** 選択範囲を変えるハンドラー */
    onChangeDisplayRange,
  };
};
