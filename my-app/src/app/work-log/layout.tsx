import Navbar from "@/component/Navbar/Navbar";

/**
 * work-logページの共通レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
