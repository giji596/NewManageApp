import Navbar from "@/component/Navbar/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
/**
 * work-logページの共通レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider>
        <Navbar />
        <main>{children}</main>
      </AppRouterCacheProvider>
    </>
  );
}
