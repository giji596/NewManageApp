type Props = {
  /** 移動元のページ順番 */
  navPages: string[];
};

/**
 * NavBarコンポーネントのロジック部分
 */
export const NavBarLogic = ({ navPages }: Props) => {
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
    isLastPageIndex,
    getLink,
  };
};
