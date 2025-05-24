import { createTheme } from "@mui/material/styles";

// MUIのテーマを拡張するための型定義
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      /** グレースケール */
      gray: {
        /** メリハリの少ないグレースケール */
        soft: string;
        /** メリハリの多いグレースケール */
        strong: string;
      };
    };
    /** ホバー時のコントラスト */
    hoverContrastText: string;
    /** グレー*/
    gray: {
      /** 中間くらいの濃さ */
      normal: string;
    };
    /** ヒートグラフ用(string[] 数が多いほど濃い色) */
    heatGraph: {
      /** 青系 */
      blue: string[];
    };
    /** recharts系 */
    recharts: {
      /** 円グラフ */
      pie: { defaultFill?: string };
    };
  }

  // PaletteOptionsはテーマのオプションを拡張するための型定義(color:aaa.bbbみたいに使える)
  interface PaletteOptions {
    /** グラデーション系 */
    gradient?: {
      /** グレースケール */
      gray?: {
        /** メリハリの少ないグレースケール */
        soft?: string;
        /** メリハリの多いグレースケール */
        strong?: string;
      };
    };
    /** ホバー時のコントラスト */
    hoverContrastText?: string;
    /** グレー*/
    gray?: {
      /** 中間くらいの濃さ */
      normal?: string;
    };
    /** ヒートグラフ用(string[] 数が多いほど濃い色) */
    heatGraph?: {
      /** 青系 */
      blue?: string[];
    };
    /** recharts系 */
    recharts?: {
      /** 円グラフ */
      pie?: { defaultFill?: string };
    };
  }
}

/** ライトテーマ(標準のテーマ) */
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    gradient: {
      gray: {
        soft: "linear-gradient(to right, rgb(255, 255, 255), rgb(220, 220, 220))",
        strong:
          "linear-gradient(to right, rgb(220, 220, 220), rgb(117, 117, 117))",
      },
    },
    hoverContrastText: "white",
    gray: { normal: "#ddd" },
    heatGraph: {
      blue: ["#cce5ff", "#66b3ff", "#3399ff", "#0073e6"],
    },
    recharts: {
      pie: { defaultFill: "#8884d8" },
    },
  },
});

/** ダークテーマ */
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212" },
    gradient: {
      gray: {
        soft: "linear-gradient(to right, rgb(117, 117, 117), rgb(220, 220, 220))",
        strong:
          "linear-gradient(to right, rgb(220, 220, 220), rgb(255, 255, 255))",
      },
    },
    hoverContrastText: "black",
    gray: { normal: "#424242" },
    heatGraph: {
      blue: ["#2a4662", "#1e3a5f", "#102e52", "#1565c0"],
    },
    recharts: {
      pie: { defaultFill: "#5a54b2" },
    },
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(255, 255, 255, 0.2)",
    "0px 1px 5px rgba(255, 255, 255, 0.2)",
    "0px 1px 8px rgba(255, 255, 255, 0.2)",
    "0px 2px 4px rgba(255, 255, 255, 0.2)",
    "0px 3px 5px rgba(255, 255, 255, 0.2)",
    "0px 4px 5px rgba(255, 255, 255, 0.5)",
    "0px 5px 6px rgba(255, 255, 255, 0.2)",
    "0px 6px 7px rgba(255, 255, 255, 0.2)",
    "0px 7px 8px rgba(255, 255, 255, 0.2)",
    "0px 8px 9px rgba(255, 255, 255, 0.2)",
    "0px 9px 10px rgba(255, 255, 255, 0.2)",
    "0px 10px 11px rgba(255, 255, 255, 0.2)",
    "0px 11px 12px rgba(255, 255, 255, 0.2)",
    "0px 12px 13px rgba(255, 255, 255, 0.2)",
    "0px 13px 14px rgba(255, 255, 255, 0.2)",
    "0px 14px 15px rgba(255, 255, 255, 0.2)",
    "0px 15px 16px rgba(255, 255, 255, 0.2)",
    "0px 16px 17px rgba(255, 255, 255, 0.2)",
    "0px 17px 18px rgba(255, 255, 255, 0.2)",
    "0px 18px 19px rgba(255, 255, 255, 0.2)",
    "0px 19px 20px rgba(255, 255, 255, 0.2)",
    "0px 20px 21px rgba(255, 255, 255, 0.2)",
    "0px 21px 22px rgba(255, 255, 255, 0.2)",
    "0px 22px 23px rgba(255, 255, 255, 0.2)",
  ],
});
