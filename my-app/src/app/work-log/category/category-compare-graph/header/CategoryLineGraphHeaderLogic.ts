import { useState } from "react";

/**
 * カテゴリ比較グラフの設定メニューのロジック
 */
export const CategoryLineGraphHeaderLogic = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const paperWidth = "80vh";
  return {
    /** 設定メニューの展開状態 */
    expanded,
    /** 設定メニューの展開状態を切り替える */
    handleToggle,
    /** 幅 */
    paperWidth,
  };
};
