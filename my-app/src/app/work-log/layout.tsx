"use client";

import Navbar from "@/component/Navbar/Navbar";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { lightTheme } from "./theme";
/**
 * work-logページの共通レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppRouterCacheProvider>
        <Navbar />
        <main>{children}</main>
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}
