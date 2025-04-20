import { usePathname } from "next/navigation";

/**
 * NavBarコンポーネントのロジック部分
 */
export const NavBarLogic = () => {
  const path = usePathname(); // ここでパス入手("/work-log/task"など)
  const navPages = path.slice(1).split("/"); // 先頭の"/"を除いて配列化
  const isLastPageIndex = (index: number): boolean =>
    navPages.length - 1 == index;

  const getLink = (pageNames: string[], index: number): string => {
    const result: string[] = ["/"];
    for (let i = 0; i <= index; i++) {
      result.push(pageNames[i]);
    }
    return result.join("/");
  };
  return {
    navPages,
    isLastPageIndex,
    getLink,
  };
};
