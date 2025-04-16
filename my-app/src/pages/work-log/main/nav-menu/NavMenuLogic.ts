import { useMemo } from "react";

/**
 * メインページのナビゲーションメニューのロジック
 */
export default function NavMenuLogic() {
  const navButtonStyle = useMemo(() => {
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 1,
      color: "primary.main",
      bgcolor: "white",
      border: "1px solid #ddd",
      borderRadius: 2,
      boxShadow: 1,
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "primary.light",
        color: "white",
        transform: "translateY(-2px)",
      },
    };
  }, []);

  return {
    /** ボタンの共通style */
    navButtonStyle,
  };
}
