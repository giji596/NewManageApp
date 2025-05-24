import { createTheme } from "@mui/material/styles";

/** ライトテーマ(標準のテーマ) */
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#fff" },
  },
});

/** ダークテーマ */
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212" },
  },
});
