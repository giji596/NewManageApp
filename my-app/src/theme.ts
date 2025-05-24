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
      /** 水色 -> 赤(達成グラフ) */
      achievement: string;
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
    /** テーブル */
    table: {
      /** ハイライト時 */
      highlighted: string;
      /** dirty時 */
      dirty: {
        /** 背景色 */
        normal: string;
        /** ホバー時の背景色 */
        hovered: string;
      };
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
      /** 水色 -> 赤(達成グラフ) */
      achievement?: string;
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
    /** テーブル */
    table?: {
      /** ハイライト時 */
      highlighted?: string;
      /** dirty時 */
      dirty?: {
        /** 背景色 */
        normal?: string;
        /** ホバー時の背景色 */
        hovered?: string;
      };
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
      achievement:
        "linear-gradient(to right,rgb(148, 244, 236),rgb(114, 255, 173),rgb(255, 53, 53))",
    },
    hoverContrastText: "white",
    gray: { light: "#ccc", normal: "#ddd" },
    heatGraph: {
      blue: ["#cce5ff", "#66b3ff", "#3399ff", "#0073e6"],
    },
    recharts: {
      pie: { defaultFill: "#8884d8" },
    },
    table: {
      highlighted: "#f5fbff",
      dirty: {
        normal: "rgb(255, 238, 238)",
        hovered: "rgb(255, 230, 230)",
      },
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
      achievement:
        "linear-gradient(to right, rgb(78, 180, 172), rgb(61, 187, 127), rgb(255, 80, 80))",
    },
    hoverContrastText: "black",
    gray: { light: "#555", normal: "#424242" },
    heatGraph: {
      blue: ["#2a4662", "#1e3a5f", "#102e52", "#1565c0"],
    },
    recharts: {
      pie: { defaultFill: "#5a54b2" },
    },
    table: {
      highlighted: "#23272b",
      dirty: {
        normal: "rgb(64, 24, 24)",
        hovered: "rgb(84, 36, 36)",
      },
    },
  },
});
