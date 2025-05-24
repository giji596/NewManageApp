"use client";

import Navbar from "@/component/Navbar/Navbar";
import { Box, ThemeProvider } from "@mui/material";
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
        <Box
          sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}
        >
          <Navbar onChangeTheme={onChangeTheme} />
          <main> {children}</main>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
