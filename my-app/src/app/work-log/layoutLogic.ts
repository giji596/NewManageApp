import { useState, useEffect, useMemo } from "react";
import { lightTheme, darkTheme } from "./theme";

/**
 * レイアウトのロジック
 */
export const LayoutLogic = () => {
  // ルートレイアウト
  const [mode, setMode] = useState<"light" | "dark">("light"); // 初期値はlight
  // 初期化(localStorageから取得)
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // darkモードが保存されている場合だけセット(保存されてない場合を含めてlightの場合はlightのまま)
    if (stored === "dark") setMode("dark");
  }, []);

  // 現在のテーマをメモ化
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return {
    /** 現在のテーマ */
    theme,
  };
};
