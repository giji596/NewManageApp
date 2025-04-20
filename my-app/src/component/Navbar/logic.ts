import { usePathname } from "next/navigation";

// 文言を変換する関数
const exchangePathName = (nameList: string[], name: string, index: number) => {
  switch (name) {
    // 名称に応じて変換
    case "work-log":
      return "TOP";
    case "daily":
      return "日付(一覧)";
    case "task":
      return "タスク(一覧)";
    case "category":
      return "カテゴリ";
    // これら以外の場合
    default:
      // [id]に当たる場合(Number化した時にNaNでない場合) ->一つ前の値がタスクかカテゴリかで分岐
      if (isNaN(Number(name))) {
        if (nameList[index - 1] === "daily") return "日付(詳細)";
        if (nameList[index - 1] === "task") return "タスク(詳細)";
      }
      // 該当しなければ空白を返す
      return "";
  }
};

/**
 * NavBarコンポーネントのロジック部分
 */
export const NavBarLogic = () => {
  const path = usePathname(); // ここでパス入手("/work-log/task"など)
  const rawPages = path.slice(1).split("/"); // 先頭の"/"を除いて配列化
  const navPages = rawPages.map((v, i) => exchangePathName(rawPages, v, i)); // 文言を変換
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
