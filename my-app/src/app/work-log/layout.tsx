"use client";

import Navbar from "@/component/Navbar/Navbar";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LayoutLogic } from "./layoutLogic";
/**
 * work-logページの共通レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, onChangeTheme } = LayoutLogic();
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Navbar onChangeTheme={onChangeTheme} />
        <main>{children}</main>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
