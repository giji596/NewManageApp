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
  },
});
