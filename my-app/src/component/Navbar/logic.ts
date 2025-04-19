/**
 * NavBarコンポーネントのロジック部分
 */
export const NavBarLogic = () => {
  // TODO:パラメータから取得？現在のページまでのパスを取得
  const navPages = ["ページ1", "ページ2"];
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
