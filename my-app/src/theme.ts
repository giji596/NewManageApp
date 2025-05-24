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
      /**明るい */
      light: string;
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
      /**明るい */
      light?: string;
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
    gray: { light: "#ccc", normal: "#ddd" },
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
    gray: { light: "#555", normal: "#424242" },
    heatGraph: {
      blue: ["#2a4662", "#1e3a5f", "#102e52", "#1565c0"],
    },
    recharts: {
      pie: { defaultFill: "#5a54b2" },
    },
  },
});
