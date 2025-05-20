import Navbar from "@/component/Navbar/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { InitializeDBWrapper } from "./component/InitializeDBWrapper/InitializeDBWrapper";
/**
 * work-logページの共通レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider>
        <Navbar />
        <InitializeDBWrapper>
          <main>{children}</main>
        </InitializeDBWrapper>
      </AppRouterCacheProvider>
    </>
  );
}
