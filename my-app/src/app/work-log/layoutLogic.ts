import { useState, useEffect, useMemo, useCallback } from "react";
import { lightTheme, darkTheme } from "../../theme";

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

  const onChangeTheme = useCallback(() => {
    setMode((prev) => {
      // lightからdarkに変更する場合はlocalStorageにdarkを保存
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
        //その後darkに変更
        return "dark";
      }
      // darkからlightに変更する場合はlocalStorageにlightを保存
      localStorage.setItem("theme", "light");
      //その後lightに変更
      return "light";
    });
  }, []);

  return {
    /** 現在のテーマ */
    theme,
    /** テーマを切り替える関数(ライトとダークのみなので切り替えるだけ) */
    onChangeTheme,
  };
};
